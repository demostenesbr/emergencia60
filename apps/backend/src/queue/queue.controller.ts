import { Controller, Get } from '@nestjs/common';

@Controller('queue')
export class QueueController {
  @Get()
  status() {
    return {
      status: 'ready',
    };
  }
}
