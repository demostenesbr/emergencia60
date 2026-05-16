import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DevicesModule } from '../devices/devices.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { AlertsRepository } from './alerts.repository';

@Module({
  imports: [PrismaModule, DevicesModule, NotificationsModule],
  controllers: [AlertsController],
  providers: [AlertsRepository, AlertsService],
  exports: [AlertsRepository, AlertsService],
})
export class AlertsModule {}
