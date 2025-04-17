import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
} from "class-validator";

export enum Role {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsPhoneNumber("RU")
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role; // По умолчанию "employee"
}

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsPhoneNumber("RU")
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
