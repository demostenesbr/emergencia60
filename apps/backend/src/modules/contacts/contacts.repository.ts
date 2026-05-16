import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  findByElderlyId(elderlyId: string) {
    return this.prisma.contact.findMany({
      where: { elderlyId },
      orderBy: { priority: 'asc' },
    });
  }

  create(data: Prisma.ContactUncheckedCreateInput) {
    return this.prisma.contact.create({ data });
  }

  update(id: string, data: Prisma.ContactUncheckedUpdateInput) {
    return this.prisma.contact.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
