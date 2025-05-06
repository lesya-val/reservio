import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto, UpdateRestaurantDto } from "./restaurants.dto";
import { JwtAuthGuard } from "../../shared/auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../shared/auth/guards/roles.guard";
import { Roles } from "src/shared/auth/decorators/roles.decorator";
import { Role } from "@prisma/client";

@Controller("restaurants")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SYSTEM_ADMIN)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // Создание ресторана
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  // Получение всех ресторанов
  @Get()
  async findAll() {
    return this.restaurantsService.findAll();
  }

  // Получение ресторана по ID
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(+id);
  }

  // Обновление ресторана
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  // Удаление ресторана
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.restaurantsService.remove(+id);
  }
}
