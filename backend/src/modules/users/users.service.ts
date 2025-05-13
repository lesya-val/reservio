import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./users.dto";
import {
  generateTemporaryPassword,
  hashPassword,
} from "../../helpers/authUtils";
import { MailService } from "@/shared/mail/mail.service";

import * as bcrypt from "bcrypt";

@Injectable()
export class EmployeesService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService
  ) {}

  // Получение всех сотрудников ресторана
  async findAll(restaurantId: number) {
    return this.prisma.user.findMany({ where: { restaurantId } });
  }

  // Получение сотрудника по ID
  async findOne(restaurantId: number, id: number) {
    return this.prisma.user.findFirst({
      where: { id, restaurantId },
    });
  }

  // Создание нового сотрудника
  async create(restaurantId: number, createEmployeeDto: CreateEmployeeDto) {
    // Генерация временного пароля
    const temporaryPassword = generateTemporaryPassword();

    
    // Хэширование пароля
    const hashedPassword = await hashPassword(temporaryPassword);
    console.log(temporaryPassword, hashedPassword);

    // Создание сотрудника с хэшированным паролем
    const employeeData = {
      ...createEmployeeDto,
      password: hashedPassword,
      restaurantId,
    };

    const createdEmployee = await this.prisma.user.create({
      data: employeeData,
    });

    // Используем MailService из DI
    await this.mailService.sendTemporaryPasswordEmail(
      createEmployeeDto.email,
      temporaryPassword,
      employeeData
    );

    return createdEmployee;
  }

  // Обновление сотрудника
  async update(
    restaurantId: number,
    id: number,
    updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateEmployeeDto, restaurantId },
    });
  }

  // Удаление сотрудника
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Изменение пароля
  async changePassword(
    restaurantId: number,
    id: number,
    oldPassword: string,
    newPassword: string
  ) {
    const employee = await this.findOne(restaurantId, id);

    if (!employee || !employee.password) {
      throw new Error("Сотрудник не найден!");
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      employee.password
    );

    if (!isPasswordValid) {
      throw new Error("Неверный временный пароль");
    }

    const hashedPassword = await hashPassword(newPassword);

    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        isTempPassword: false,
      },
    });
  }
}
