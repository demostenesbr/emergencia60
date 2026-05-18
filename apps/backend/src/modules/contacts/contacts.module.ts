import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsRepository } from './contacts.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ContactsController],
  providers: [ContactsRepository, ContactsService],
  exports: [ContactsRepository, ContactsService],
})
export class ContactsModule {}
