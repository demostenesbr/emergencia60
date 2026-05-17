import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Verificar saúde da API',
    description:
      'Endpoint de health check para verificar se a API está operacional e acessível.',
  })
  @ApiOkResponse({
    description: 'API está operacional',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2024-05-17T10:30:00.000Z',
        uptime: 3600,
      },
    },
  })
  async check(): Promise<any> {
    return this.healthService.check();
  }
}
