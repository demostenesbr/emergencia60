import { Module } from '@nestjs/common';
import { ElderlyService } from './elderly.service';
import { ElderlyController } from './elderly.controller';

@Module({
  controllers: [ElderlyController],
  providers: [ElderlyService],
})
export class ElderlyModule {}
