import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Notification {
  @ApiProperty({
    description: 'Unique identifier for the notification',
    example: 'uuid-string',
  })
  id!: string;

  @ApiProperty({
    description: 'ID of the alert that triggered this notification',
    example: 'uuid-string',
  })
  alertId!: string;

  @ApiPropertyOptional({
    description: 'ID of the user who receives this notification',
    example: 'uuid-string',
  })
  userId?: string | null;

  @ApiProperty({
    description: 'Type of notification',
    enum: ['SMS', 'PUSH', 'EMAIL'],
  })
  type!: string;

  @ApiProperty({
    description: 'Status of the notification',
    enum: ['QUEUED', 'SENT', 'FAILED', 'READ'],
  })
  status!: string;

  @ApiProperty({
    description: 'Destination for the notification (phone, email, device token)',
    example: '5511987654321',
  })
  destination!: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Emergency alert received',
  })
  message!: string;

  @ApiPropertyOptional({
    description: 'Timestamp when notification was sent',
    example: '2026-05-17T10:30:00Z',
  })
  sentAt?: Date | null;

  @ApiPropertyOptional({
    description: 'Timestamp when notification was read',
    example: '2026-05-17T10:35:00Z',
  })
  readAt?: Date | null;

  @ApiPropertyOptional({
    description: 'Response from the notification provider',
  })
  providerResponse?: any;

  @ApiProperty({
    description: 'Timestamp when notification was created',
    example: '2026-05-17T10:30:00Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Timestamp when notification was last updated',
    example: '2026-05-17T10:30:00Z',
  })
  updatedAt!: Date;
}
