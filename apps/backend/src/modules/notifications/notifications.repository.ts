import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.notification.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  create(data: Prisma.NotificationUncheckedCreateInput) {
    return this.prisma.notification.create({ data });
  }

  update(id: string, data: Prisma.NotificationUncheckedUpdateInput) {
    return this.prisma.notification.update({ where: { id }, data });
  }

  markSent(id: string, providerResponse?: Prisma.InputJsonValue) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        providerResponse,
      },
    });
  }

  markFailed(id: string, providerResponse?: Prisma.InputJsonValue) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        status: 'FAILED',
        providerResponse,
      },
    });
  }

  markRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        status: 'READ',
        readAt: new Date(),
      },
    });
  }
}
