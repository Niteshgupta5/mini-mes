import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMaterialsDto {
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  unit?: string;
  @IsOptional()
  stock?: number;
}
