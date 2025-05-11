import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
} from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber("RU")
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsPhoneNumber("RU")
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  adminId?: number;
}
