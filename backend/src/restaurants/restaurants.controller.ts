import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto, UpdateRestaurantDto } from "./restaurants.dto";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // Создание ресторана
  @Post()
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurantsService.create(dto);
  }

  // Получение всех ресторанов
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  // Получение ресторана по ID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(+id);
  }

  // Обновление ресторана
  @Patch(":id")
  partialUpdate(
    @Param("id") id: string,
    @Body() dto: Partial<UpdateRestaurantDto>
  ) {
    return this.restaurantsService.partialUpdate(+id, dto);
  }

  // Удаление ресторана
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(+id);
  }
}
