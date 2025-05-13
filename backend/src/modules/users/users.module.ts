import { Module } from "@nestjs/common";
import { EmployeesService } from "./users.service";
import { EmployeesController } from "./users.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MailModule } from "@/shared/mail/mail.module";

@Module({
  imports: [MailModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService, ConfigService],
})
export class EmployeesModule {}
