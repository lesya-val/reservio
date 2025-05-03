import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.servise";
import { CreateBookingDto, UpdateBookingDto } from "./bookings.dto";

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Создание бронирования
  async create(createBookingDto: CreateBookingDto) {
    return this.prisma.booking.create({ data: createBookingDto });
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
    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  // Удаление бронирования
  async remove(id: number) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
