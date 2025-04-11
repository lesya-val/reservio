import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.servise";
import { CreateRestaurantDto, UpdateRestaurantDto } from "./restaurants.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  // Создание ресторана
  async create(dto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: dto,
    });
  }

  // Массовое создание ресторанов
  async createMany(dtos: CreateRestaurantDto[]) {
    return this.prisma.restaurant.createMany({
      data: dtos,
    });
  }

  // Получение всех ресторанов
  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  // Получение ресторана по ID
  async findOne(id: number) {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  // Обновление ресторана
  async partialUpdate(id: number, dto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: dto,
    });
  }

  // Удаление ресторана
  async remove(id: number) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
