import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  elderlyId!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiProperty()
  @IsString()
  phone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  receiveSms?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  receivePush?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  receiveEmail?: boolean;
}
