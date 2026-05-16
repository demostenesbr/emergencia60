import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      service: 'Emergência 60+ API',
      status: 'running',
    };
  }
}
