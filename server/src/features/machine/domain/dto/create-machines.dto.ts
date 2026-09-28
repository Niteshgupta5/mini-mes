import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMachinesDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  workCenter?: any;
}
