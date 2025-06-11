import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
} from "@nestjs/common";
import { PreBookingsService } from "./pre-bookings.service";
import { CreatePreBookingDto } from "./pre-bookings.dto";

@Controller("pre-bookings")
export class PreBookingsController {
  constructor(private readonly preBookingsService: PreBookingsService) {}

  // Получение всех PENDING заявок для ресторана
  @Get()
  async getPending(@Query("restaurantId") restaurantId: string) {
    return this.preBookingsService.getPendingRequests(+restaurantId);
  }

  // Создание заявки
  @Post()
  async create(
    @Query("restaurantId") restaurantId: string,
    @Body() dto: CreatePreBookingDto
  ) {
    return this.preBookingsService.create(+restaurantId, dto);
  }

  // Удаление заявки
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.preBookingsService.deleteRequest(+id);
  }

  // Подтверждение
  @Post(":id/accept")
  async accept(@Param("id") id: string) {
    return this.preBookingsService.acceptRequest(+id);
  }

  // Отказ
  @Post(":id/reject")
  async reject(@Param("id") id: string) {
    return this.preBookingsService.rejectRequest({ id: +id });
  }
}
