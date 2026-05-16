import { Controller, Get } from '@nestjs/common';

@Controller('workers')
export class WorkersController {
  @Get()
  status() {
    return {
      status: 'ready',
    };
  }
}
