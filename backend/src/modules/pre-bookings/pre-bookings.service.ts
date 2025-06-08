import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreatePreBookingDto } from "./pre-bookings.dto";
import { NotificationsGateway } from "../notifications/notifications.gateway";
import { MailService } from "@/shared/mail/mail.service";

@Injectable()
export class PreBookingsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
    private mailService: MailService
  ) {}

  // Получение всех PENDING заявок для ресторана
  async getPendingRequests(restaurantId: number) {
    return this.prisma.preBooking.findMany({
      where: {
        restaurant: {
          id: restaurantId,
        },
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Создание заявки
  async create(restaurantId: number, data: CreatePreBookingDto) {
    const request = await this.prisma.preBooking.create({
      data: {
        ...data,
        restaurant: {
          connect: { id: restaurantId },
        },
        status: "PENDING",
      },
    });

    this.notificationsGateway.server
      .to(`restaurant_${restaurantId}`)
      .emit("new-pre-booking", request);

    return request;
  }

  // Подтверждение заявки
  async acceptRequest(requestId: number) {
    return this.prisma.preBooking.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
    });
  }

  // Отказ в заявке
  async rejectRequest(request: { id: number }) {
    const preBooking = await this.prisma.preBooking.findUnique({
      where: { id: request.id },
      include: {
        restaurant: true,
      },
    });

    if (!preBooking) {
      throw new Error("Заявка не найдена");
    }

    const updatedRequest = await this.prisma.preBooking.update({
      where: { id: request.id },
      data: { status: "REJECTED" },
    });

    if (preBooking.email) {
      const [dateStr, timeStr] = String(preBooking.dateTime).split("T");

      // Форматируем дату как "DD.MM.YYYY"
      const [year, month, day] = dateStr.split("-");
      const formattedDate = `${day}.${month}.${year}`;

      // Форматируем время как "HH:mm"
      const formattedTime = timeStr.slice(0, 5);

      await this.mailService.sendRejectBookingEmail(preBooking.email, {
        name: preBooking.name,
        restaurant: preBooking.restaurant.name,
        date: formattedDate,
        time: formattedTime,
        guestsCount: preBooking.guestsCount,
      });
    }

    return updatedRequest;
  }
}
