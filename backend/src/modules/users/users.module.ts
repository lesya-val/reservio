import { Module } from "@nestjs/common";
import { EmployeesService } from "./users.service";
import { EmployeesController } from "./users.controller";
import { PrismaService } from "prisma/prisma.servise";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService, ConfigService],
})
export class EmployeesModule {}
