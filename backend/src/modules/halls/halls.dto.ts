import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from "class-validator";
import { CreateTableDto } from "../tables/tables.dto";

export class CreateHallDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  capacity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTableDto)
  tables: CreateTableDto[];
}

export class UpdateHallDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  capacity?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTableDto)
  tables?: CreateTableDto[];
}
