import { Module } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";
import { PrismaService } from "src/prisma.servise";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService, ConfigService],
})
export class EmployeesModule {}
