import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class RoutingOperationDto {
  @IsInt()
  @Min(1)
  sequence: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  idealCycleSeconds: number;

  @IsUUID()
  workCenterId: string;
}

export class CreateRoutingDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoutingOperationDto)
  operations: RoutingOperationDto[];
}
