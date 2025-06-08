import { PreBookingStatusEnum } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
} from "class-validator";

export class CreatePreBookingDto {
  @IsEnum(PreBookingStatusEnum)
  @IsOptional()
  status?: PreBookingStatusEnum;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: string;

  @IsInt()
  @IsNotEmpty()
  guestsCount: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdatePreBookingDto {
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
  email?: string;

  @IsString()
  @IsOptional()
  dateTime?: string;

  @IsInt()
  @IsOptional()
  guestsCount?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
