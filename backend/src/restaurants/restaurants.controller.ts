import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto, UpdateRestaurantDto } from "./restaurants.dto";

@Controller("restaurants")
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
