import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

import { Type } from "class-transformer";

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Название ресторана

  @IsNumber()
  @IsNotEmpty()
  address: string; // Адрес ресторана

  @IsOptional()
  @IsPhoneNumber("RU") // Валидация номера телефона для России
  phone?: string; // Телефон ресторана

  @IsOptional()
  @IsEmail()
  email?: string; // Email ресторана

  @IsOptional()
  @IsString()
  workingHours?: string; // Часы работы

  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean; // Статус активности (по умолчанию true)
}

export type TUpdateRestaurantDto = Partial<CreateRestaurantDto>;
