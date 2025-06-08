import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateBookingDto, UpdateBookingDto } from "./bookings.dto";
import { BookingStatus } from "@prisma/client";
import { MailService } from "@/shared/mail/mail.service";

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService
  ) {}

  // Создание бронирования
  async create(restaurantId: number, userId: number, data: CreateBookingDto) {
    const createdBooking = this.prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        guestsCount: data.guestsCount,
        notes: data.notes || null,
        email: data.email || null,
        userId: +userId,
        restaurantId: +restaurantId,
        tableId: data.tableId || null,
        dateTime: data.dateTime,
        status: data.status || BookingStatus.NEW,
      },
    });

    if (data.email) {
      const [dateStr, timeStr] = data.dateTime.split("T");

      // Форматируем дату как "DD.MM.YYYY"
      const [year, month, day] = dateStr.split("-");
      const formattedDate = `${day}.${month}.${year}`;

      // Форматируем время как "HH:mm"
      const formattedTime = timeStr.slice(0, 5);

      await this.mailService.sendConfirmBookingEmail(data.email, {
        name: data.name,
        restaurant: "",
        date: formattedDate,
        time: formattedTime,
        guestsCount: data.guestsCount,
      });
    }
    return createdBooking;
  }

  // Получение всех бронирований
  async findAll() {
    return this.prisma.booking.findMany();
  }

  // Получение бронирования по ID
  async findOne(id: number) {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  // Обновление бронирования
  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const dataToUpdate: any = {};

    if (updateBookingDto.name !== undefined)
      dataToUpdate.name = updateBookingDto.name;
    if (updateBookingDto.phone !== undefined)
      dataToUpdate.phone = updateBookingDto.phone;
    if (updateBookingDto.guestsCount !== undefined)
      dataToUpdate.guestsCount = updateBookingDto.guestsCount;
    if (updateBookingDto.dateTime !== undefined)
      dataToUpdate.dateTime = new Date(updateBookingDto.dateTime);
    if (updateBookingDto.notes !== undefined)
      dataToUpdate.notes = updateBookingDto.notes;

    if (updateBookingDto.tableId !== undefined) {
      dataToUpdate.tableId = updateBookingDto.tableId ?? null;
    }

    if (updateBookingDto.status !== undefined) {
      dataToUpdate.status = updateBookingDto.status;
    }

    return this.prisma.booking.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  // Удаление бронирования
  async remove(id: number) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
