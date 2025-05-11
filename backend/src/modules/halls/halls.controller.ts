import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { HallsService } from "./halls.service";
import { CreateHallDto, UpdateHallDto } from "./halls.dto";
import { User } from "src/shared/auth/decorators/user.decorator";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("halls")
@UseGuards(AuthGuard("jwt"))
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  // Создание нового зала
  @Post()
  async create(
    @Body() createHallDto: CreateHallDto,
    @User("restaurantId") restaurantId: number
  ) {
    return this.hallsService.create(restaurantId, createHallDto);
  }

  // Получение всех залов ресторана
  @Get()
  async findAll(@User("restaurantId") restaurantId: number) {
    return this.hallsService.findAll(restaurantId);
  }

  // Получение зала по ID
  @Get(":id")
  async findOne(
    @User("restaurantId") restaurantId: number,
    @Param("id") id: string
  ) {
    return this.hallsService.findOne(restaurantId, +id);
  }

  // Обновление зала
  @Patch(":id")
  async update(
    @User("restaurantId") restaurantId: number,
    @Param("id") id: string,
    @Body() updateHallDto: UpdateHallDto
  ) {
    return this.hallsService.update(restaurantId, +id, updateHallDto);
  }

  // Удаление зала
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.hallsService.remove(+id);
  }
}
