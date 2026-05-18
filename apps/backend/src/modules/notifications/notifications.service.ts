import { Injectable, NotFoundException } from '@nestjs/common';
import { QueueService } from '../../queue/queue.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly queueService: QueueService,
  ) {}

  enqueueAlert(alertId: string) {
    return this.queueService.enqueueAlertNotification(alertId);
  }

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationsRepository.create(createNotificationDto as any);
  }

  findAll() {
    return this.notificationsRepository.findAll();
  }

  async findOne(id: string) {
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }

    return notification;
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsRepository.update(
      id,
      updateNotificationDto as any,
    );
  }

  markRead(id: string) {
    return this.notificationsRepository.markRead(id);
  }

  remove(id: string) {
    return this.notificationsRepository.markFailed(id, { removed: true });
  }
}
