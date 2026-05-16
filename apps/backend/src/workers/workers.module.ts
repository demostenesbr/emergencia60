import { Module } from '@nestjs/common';
import { AlertsModule } from '../modules/alerts/alerts.module';
import { ContactsModule } from '../modules/contacts/contacts.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';
import { QueueModule } from '../queue/queue.module';
import { NotificationsProcessor } from './notifications.processor';
import { WorkersService } from './workers.service';

@Module({
  imports: [QueueModule, AlertsModule, ContactsModule, NotificationsModule],
  providers: [WorkersService, NotificationsProcessor],
  exports: [WorkersService],
})
export class WorkersModule {}
