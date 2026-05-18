import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DevicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.device.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string) {
    return this.prisma.device.findUnique({ where: { id } });
  }

  findBySerialNumber(serialNumber: string) {
    return this.prisma.device.findUnique({ where: { serialNumber } });
  }

  create(data: Prisma.DeviceUncheckedCreateInput) {
    return this.prisma.device.create({ data });
  }

  update(id: string, data: Prisma.DeviceUncheckedUpdateInput) {
    return this.prisma.device.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.device.delete({ where: { id } });
  }

  heartbeat(id: string, data: Prisma.DeviceUncheckedUpdateInput) {
    return this.prisma.device.update({
      where: { id },
      data: {
        ...data,
        lastHeartbeat: new Date(),
      },
    });
  }
}
