import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { TablesService } from "./tables.service";
import { CreateTableDto, UpdateTableDto } from "./tables.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("tables")
@UseGuards(AuthGuard("jwt"))
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tablesService.findById(+id);
  }

  @Get(":id/bookings")
  findOneWithBookings(@Param("id") id: string, @Query("date") date: string) {
    if (!date) {
      throw new Error("Необходимо указать дату");
    }
    return this.tablesService.findByIdWithBookings(+id, date);
  }

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tablesService.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTableDto) {
    return this.tablesService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tablesService.remove(+id);
  }
}
