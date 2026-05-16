import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      service: 'Emergência 60+ API',
      timestamp: new Date().toISOString(),
    };
  }
}
