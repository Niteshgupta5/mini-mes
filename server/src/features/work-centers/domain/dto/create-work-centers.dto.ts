import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkCentersDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}
