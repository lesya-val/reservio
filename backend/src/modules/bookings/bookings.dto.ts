import { BookingStatus } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
} from "class-validator";

export class CreateBookingDto {
  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: string;

  @IsInt()
  @IsNotEmpty()
  guestsCount: number;

  @IsInt()
  hallId: number;

  @IsInt()
  tableId: number;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateBookingDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  dateTime?: string;

  @IsInt()
  @IsOptional()
  guestsCount?: number;

  @IsInt()
  @IsOptional()
  hallId?: number;

  @IsInt()
  @IsOptional()
  tableId?: number;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
