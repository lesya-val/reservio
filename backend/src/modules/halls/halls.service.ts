import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateHallDto, UpdateHallDto } from "./halls.dto";

@Injectable()
export class HallsService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание нового зала
  async create(restaurantId: number, createHallDto: CreateHallDto) {
    const { tables, ...hallData } = createHallDto;

    return this.prisma.hall.create({
      data: {
        ...hallData,
        restaurantId,
        tables: {
          create: tables?.map((table) => ({
            number: table.number,
            capacity: table.capacity,
            x: table.x,
            y: table.y,
            width: table.width,
            height: table.height,
          })),
        },
      },
      include: { tables: true },
    });
  }

  // Получение всех залов ресторана
  async findAll(restaurantId: number) {
    return this.prisma.hall.findMany({
      where: { restaurantId },
      include: { tables: true },
    });
  }

  // Получение одного зала
  async findOne(restaurantId: number, id: number) {
    return this.prisma.hall.findFirst({
      where: { id, restaurantId },
      include: { tables: true },
    });
  }

  // Обновление зала
  async update(restaurantId: number, id: number, updateHallDto: UpdateHallDto) {
    const { tables, ...hallData } = updateHallDto;

    return this.prisma.hall.update({
      where: { id },
      data: {
        ...hallData,
        restaurantId,
        tables: {
          deleteMany: {},
          create: tables?.map((table) => ({
            number: table.number,
            capacity: table.capacity,
            x: table.x,
            y: table.y,
            width: table.width,
            height: table.height,
          })),
        },
      },
      include: { tables: true },
    });
  }

  // Удаление зала
  async remove(id: number) {
    return this.prisma.hall.delete({ where: { id } });
  }
}
