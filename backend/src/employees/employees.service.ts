import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.servise";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./employees.dto";
import { generateTemporaryPassword, hashPassword } from "../helpers/authUtils";

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // Получение всех сотрудников ресторана
  async findAll(restaurantId: number) {
    return this.prisma.employee.findMany({ where: { restaurantId } });
  }

  // Получение сотрудника по ID
  async findOne(restaurantId: number, id: number) {
    return this.prisma.employee.findFirst({
      where: { id, restaurantId },
    });
  }

  // Создание нового сотрудника
  async create(restaurantId: number, createEmployeeDto: CreateEmployeeDto) {
    // Генерация временного пароля
    const temporaryPassword = generateTemporaryPassword();

    // Хэширование пароля
    const hashedPassword = await hashPassword(temporaryPassword);

    // Создание сотрудника с хэшированным паролем
    const employeeData = {
      ...createEmployeeDto,
      password: hashedPassword,
      restaurantId,
    };

    return await this.prisma.employee.create({
      data: employeeData,
    });
  }

  // Обновление сотрудника
  async update(
    restaurantId: number,
    id: number,
    updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.prisma.employee.update({
      where: { id },
      data: { ...updateEmployeeDto, restaurantId },
    });
  }

  // Удаление сотрудника
  async remove(id: number) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
