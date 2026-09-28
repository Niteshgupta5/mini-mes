import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { QualityResult } from '../enum';

export class CreateQualityDto {
  @IsUUID()
  workOrderId: string;

  @IsString()
  parameter: string;

  @IsString()
  measuredValue: string;

  @IsOptional()
  @IsString()
  specification?: string;

  @IsEnum(QualityResult)
  result: QualityResult;

  @IsOptional()
  @IsString()
  remarks?: string;
}
