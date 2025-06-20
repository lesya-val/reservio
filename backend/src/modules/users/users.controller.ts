import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { EmployeesService } from "./users.service";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./users.dto";

@Controller("restaurants/:restaurantId/employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Получение всех сотрудников ресторана
  @Get()
  async findAll(@Param("restaurantId") restaurantId: string) {
    return this.employeesService.findAll(+restaurantId);
  }

  // Получение сотрудника по ID
  @Get(":id")
  async findOne(
    @Param("restaurantId") restaurantId: string,
    @Param("id") id: string
  ) {
    return this.employeesService.findOne(+restaurantId, +id);
  }

  // Создание нового сотрудника
  @Post()
  async create(
    @Param("restaurantId") restaurantId: string,
    @Body() createEmployeeDto: CreateEmployeeDto
  ) {
    return this.employeesService.create(+restaurantId, createEmployeeDto);
  }

  // Обновление сотрудника
  @Patch(":id")
  async update(
    @Param("restaurantId") restaurantId: string,
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(+restaurantId, +id, updateEmployeeDto);
  }

  // Удаление сотрудника
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }

  // Обновление пароля
  @Patch(":id/change-password")
  async changePassword(
    @Param("restaurantId") restaurantId: string,
    @Param("id") id: string,
    @Body() body: { oldPassword: string; newPassword: string }
  ) {
    return this.employeesService.changePassword(
      +restaurantId,
      +id,
      body.oldPassword,
      body.newPassword
    );
  }
}
