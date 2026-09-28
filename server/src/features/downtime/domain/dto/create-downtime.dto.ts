import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DowntimeCategory } from '../enum';

export class CreateDowntimeDto {
  @IsUUID()
  machineId: string;

  @IsOptional()
  @IsUUID()
  workOrderId?: string;

  @IsEnum(DowntimeCategory)
  category: DowntimeCategory;

  @IsString()
  reason: string;

  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsDateString()
  endedAt?: string;
}
