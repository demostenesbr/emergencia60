import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ElderlyRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.elderly.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string) {
    return this.prisma.elderly.findUnique({ where: { id } });
  }

  create(data: Prisma.ElderlyUncheckedCreateInput) {
    return this.prisma.elderly.create({ data });
  }

  update(id: string, data: Prisma.ElderlyUncheckedUpdateInput) {
    return this.prisma.elderly.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.elderly.delete({ where: { id } });
  }
}
