import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ElderlyService } from './elderly.service';
import { ElderlyController } from './elderly.controller';
import { ElderlyRepository } from './elderly.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ElderlyController],
  providers: [ElderlyRepository, ElderlyService],
  exports: [ElderlyRepository, ElderlyService],
})
export class ElderlyModule {}
