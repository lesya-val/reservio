import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.servise";
import { CreateRestaurantDto, UpdateRestaurantDto } from "./restaurants.dto";

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  // Создание ресторана
  async create(createRestaurantDto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({ data: createRestaurantDto });
  }

  // Получение всех ресторанов
  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  // Получение ресторана по ID
  async findOne(id: number) {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  // Обновление ресторана
  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  // Удаление ресторана
  async remove(id: number) {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
