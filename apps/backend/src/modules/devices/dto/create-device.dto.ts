import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  elderlyId!: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  serialNumber!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firmwareVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  macAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  batteryLevel?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  signalStrength?: number;
}
