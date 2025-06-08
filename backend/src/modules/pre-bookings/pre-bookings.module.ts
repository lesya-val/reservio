import { Module } from "@nestjs/common";
import { PreBookingsService } from "./pre-bookings.service";
import { PreBookingsController } from "./pre-bookings.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { NotificationsGateway } from "../notifications/notifications.gateway";
import { MailService } from "@/shared/mail/mail.service";

@Module({
  controllers: [PreBookingsController],
  providers: [
    PreBookingsService,
    PrismaService,
    NotificationsGateway,
    MailService,
  ],
})
export class PreBookingsModule {}
