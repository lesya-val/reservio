import { Module } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { RestaurantsController } from "./restaurants.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService, ConfigService],
})
export class RestaurantsModule {}
