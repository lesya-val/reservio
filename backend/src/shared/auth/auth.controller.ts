import { Controller, Post, Body, Response } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body() loginDto: { email: string; password: string },
    @Response({ passthrough: true }) res
  ) {
    const { access_token, user } = await this.authService.login(
      loginDto.email,
      loginDto.password
    );

    // Установка куки
    res.cookie("auth_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
    });

    return { user };
  }
}
