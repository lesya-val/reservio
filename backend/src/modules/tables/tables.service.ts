import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateTableDto, UpdateTableDto } from "./tables.dto";

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.table.findMany();
  }

  async findById(id: number) {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new Error("Стол не найден");
    }

    return table;
  }

  async findByIdWithBookings(id: number, date: string) {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            dateTime: {
              gte: new Date(date), // Больше или равно началу дня
              lt: new Date(
                new Date(date).setDate(new Date(date).getDate() + 1)
              ), // Меньше начала следующего дня
            },
            status: {
              not: "CANCELED", // Исключаем отмененные брони
            },
          },
          select: {
            id: true,
            dateTime: true,
            status: true,
            guestsCount: true,
            name: true,
            phone: true,
          },
        },
      },
    });

    if (!table) {
      throw new Error("Стол не найден");
    }

    return table;
  }

  async create(data: CreateTableDto) {
    return this.prisma.table.create({ data });
  }

  async update(id: number, data: UpdateTableDto) {
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.table.delete({ where: { id } });
  }
}
