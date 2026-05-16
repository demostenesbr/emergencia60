import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlertsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
      include: { device: true, elderly: true, notifications: true },
    });
  }

  findById(id: string) {
    return this.prisma.alert.findUnique({
      where: { id },
      include: { device: true, elderly: true, notifications: true },
    });
  }

  findRecentByDeviceId(deviceId: string) {
    return this.prisma.alert.findFirst({
      where: {
        deviceId,
        createdAt: {
          gte: new Date(Date.now() - 5000),
        },
      },
    });
  }

  create(data: Prisma.AlertUncheckedCreateInput) {
    return this.prisma.alert.create({ data });
  }

  update(id: string, data: Prisma.AlertUncheckedUpdateInput) {
    return this.prisma.alert.update({ where: { id }, data });
  }
}
