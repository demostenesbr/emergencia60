import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';

@Module({
  imports: [PrismaModule],
  controllers: [DevicesController],
  providers: [DevicesRepository, DevicesService],
  exports: [DevicesRepository, DevicesService],
})
export class DevicesModule {}
