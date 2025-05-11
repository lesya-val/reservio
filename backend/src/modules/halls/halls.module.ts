import { Module } from "@nestjs/common";
import { HallsController } from "./halls.controller";
import { HallsService } from "./halls.service";
import { PrismaService } from "prisma/prisma.servise";

@Module({
  controllers: [HallsController],
  providers: [HallsService, PrismaService],
})
export class HallsModule {}
