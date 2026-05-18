import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Endpoint raiz',
    description: 'Retorna informações gerais da API',
  })
  @ApiOkResponse({
    description: 'Informações da API retornadas com sucesso',
    schema: {
      example: {
        message: 'Welcome to Emergência 60+ API',
        version: '1.0.0',
        apiDocumentation: 'http://localhost:3000/api/v1/docs',
      },
    },
  })
  getRoot() {
    return this.appService.getRoot();
  }
}
