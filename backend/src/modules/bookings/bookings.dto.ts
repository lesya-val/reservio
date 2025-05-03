import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDate,
} from "class-validator";

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()Booking
  @IsNotEmpty()
  phone: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsInt()
  @IsNotEmpty()
  guestsCount: number;

  @IsOptional()
  @IsInt()
  tableNumber?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  @IsNotEmpty()
  restaurantId: number;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsInt()
  guestsCount?: number;

  @IsOptional()
  @IsInt()
  tableNumber?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  restaurantId?: number;
}
