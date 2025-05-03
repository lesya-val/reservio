import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto, UpdateBookingDto } from "./bookings.dto";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Создание бронирования
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  // Получение всех бронирований
  @Get()
  async findAll() {
    return this.bookingsService.findAll();
  }

  // Получение бронирования по ID
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(+id);
  }

  // Обновление бронирования
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateBookingDto: UpdateBookingDto
  ) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  // Удаление бронирования
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.bookingsService.remove(+id);
  }
}
