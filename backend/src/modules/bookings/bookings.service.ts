import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateBookingDto, UpdateBookingDto } from "./bookings.dto";
import { BookingStatus } from "@prisma/client";

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Создание бронирования
  async create(restaurantId: number, data: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        guestsCount: data.guestsCount,
        notes: data.notes || null,
        restaurantId: +restaurantId,
        tableId: data.tableId || null,
        dateTime: data.dateTime,
        status: data.status || BookingStatus.NEW,
      },
    });
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
