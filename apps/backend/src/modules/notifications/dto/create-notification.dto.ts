import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum NotificationType {
  SMS = 'SMS',
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
}

export enum NotificationStatus {
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}

export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID of the alert that triggered this notification',
    example: 'uuid-string',
  })
  @IsString()
  alertId!: string;

  @ApiPropertyOptional({
    description: 'ID of the user who receives this notification',
    example: 'uuid-string',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'Type of notification',
    enum: NotificationType,
  })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiPropertyOptional({
    description: 'Status of the notification',
    enum: NotificationStatus,
  })
  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;

  @ApiProperty({
    description: 'Destination for the notification (phone, email, device token)',
    example: '5511987654321',
  })
  @IsString()
  destination!: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Emergency alert received',
  })
  @IsString()
  message!: string;
}
