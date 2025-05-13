import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { PrismaService } from "@/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [MailService, PrismaService, ConfigService],
  exports: [MailService],
})
export class MailModule {}
