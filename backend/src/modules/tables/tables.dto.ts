import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTableDto {
  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsInt()
  @IsNotEmpty()
  capacity: number;

  @IsInt()
  @IsNotEmpty()
  x: number;

  @IsInt()
  @IsNotEmpty()
  y: number;

  @IsInt()
  @IsNotEmpty()
  width: number;

  @IsInt()
  @IsNotEmpty()
  height: number;

  @IsInt()
  @IsNotEmpty()
  hallId: number;
}

export class UpdateTableDto {
  @IsInt()
  @IsOptional()
  number?: number;

  @IsInt()
  @IsOptional()
  capacity?: number;

  @IsInt()
  @IsOptional()
  x?: number;

  @IsInt()
  @IsOptional()
  y?: number;

  @IsInt()
  @IsOptional()
  width?: number;

  @IsInt()
  @IsOptional()
  height?: number;

  @IsInt()
  @IsOptional()
  hallId?: number;
}
