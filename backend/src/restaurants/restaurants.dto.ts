import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
} from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Название ресторана

  @IsString()
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
  @IsBoolean()
  isActive?: boolean; // Статус активности (по умолчанию true)
}

export type TUpdateRestaurantDto = Partial<CreateRestaurantDto>;
