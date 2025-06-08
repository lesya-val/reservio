import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>("JWT_SECRET");

    if (!jwtSecret) {
      throw new Error("JWT_SECRET не задан в переменных окружения!");
    }

    super({
      // Изменено: читаем из кук или заголовка (на случай devtools)
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromBodyField("token"),
        ExtractJwt.fromUrlQueryParameter("token"),
        (req) => {
          console.log("Cookies:", req.cookies);
          const token = req.cookies?.auth_token;
          console.log("Extracted token:", token);
          return token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: any) {
    return {
      id: payload.sub,
      role: payload.role,
      restaurantId: payload.restaurantId,
      restaurantName: payload.restaurantName,
      isTempPassword: payload.isTempPassword,
    };
  }
}
