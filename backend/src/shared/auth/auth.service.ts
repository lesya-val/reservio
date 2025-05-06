import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../prisma/prisma.servise";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    if (!user.password) {
      throw new UnauthorizedException("Пароль не установлен");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const restaurant = user.restaurantId
      ? await this.prisma.restaurant.findUnique({
          where: { id: user.restaurantId },
          select: { name: true },
        })
      : null;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      restaurantId: user.restaurantId,
      restaurantName: restaurant?.name || null,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        role: user.role,
        restaurantId: user.restaurantId,
        restaurantName: restaurant?.name || null,
        isTempPassword: user.isTempPassword,
      },
    };
  }
}
