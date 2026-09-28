import { IsOptional } from 'class-validator';

export class UpdateMachinesDto {
  @IsOptional()
  code: string;

  @IsOptional()
  name: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  workCenter?: any;
}
