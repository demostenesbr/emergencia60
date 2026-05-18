import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ContactsRepository } from '../modules/contacts/contacts.repository';
import { AlertsRepository } from '../modules/alerts/alerts.repository';
import { NotificationsRepository } from '../modules/notifications/notifications.repository';
import { NOTIFICATIONS_QUEUE } from '../queue/queue.constants';
import { WorkersService } from './workers.service';

@Processor(NOTIFICATIONS_QUEUE)
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  constructor(
    private readonly workersService: WorkersService,
    private readonly alertsRepository: AlertsRepository,
    private readonly contactsRepository: ContactsRepository,
    private readonly notificationsRepository: NotificationsRepository,
  ) {
    super();
  }

  async process(job: Job<{ alertId: string }>): Promise<void> {
    this.logger.log(
      `Processing notification job ${job.id} for alert ${job.data.alertId}`,
    );

    const alert = await this.alertsRepository.findById(job.data.alertId);

    if (!alert) {
      throw new Error('Alert not found');
    }

    const contacts = await this.contactsRepository.findByElderlyId(
      alert.elderlyId,
    );

    for (const contact of contacts) {
      const message = `Emergência para ${alert.elderly?.name ?? 'idoso'}`;

      if (contact.receiveSms) {
        const notification = await this.notificationsRepository.create({
          alertId: alert.id,
          type: 'SMS',
          status: 'QUEUED',
          destination: contact.phone,
          message,
        });

        await this.workersService.sendSms(contact.phone, message);
        await this.notificationsRepository.markSent(notification.id, {
          channel: 'SMS',
        });
      }

      if (contact.receivePush) {
        const notification = await this.notificationsRepository.create({
          alertId: alert.id,
          type: 'PUSH',
          status: 'QUEUED',
          destination: contact.phone,
          message,
        });

        await this.workersService.sendPush(contact.phone, message);
        await this.notificationsRepository.markSent(notification.id, {
          channel: 'PUSH',
        });
      }

      if (contact.receiveEmail && contact.email) {
        const notification = await this.notificationsRepository.create({
          alertId: alert.id,
          type: 'EMAIL',
          status: 'QUEUED',
          destination: contact.email,
          message,
        });

        await this.workersService.sendEmail(contact.email, message);
        await this.notificationsRepository.markSent(notification.id, {
          channel: 'EMAIL',
        });
      }
    }
  }
}
