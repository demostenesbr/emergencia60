import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { NOTIFICATIONS_QUEUE } from './queue.constants';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(NOTIFICATIONS_QUEUE) private readonly notificationsQueue: Queue) {}

  enqueueAlertNotification(alertId: string) {
    return this.notificationsQueue.add(
      'send-alert',
      { alertId },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: true,
      },
    );
  }
}
