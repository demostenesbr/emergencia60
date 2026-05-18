import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { Alert } from './entities/alert.entity'; import { Alert as AlertType } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo alerta',
    description:
      'Cria um novo alerta no sistema. Pode ser acionado por um dispositivo ou manualmente.',
  })
  @ApiCreatedResponse({
    description: 'Alerta criado com sucesso',
    type: Alert,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  @ApiHeader({
    name: 'x-device-key',
    description: 'Chave opcional do dispositivo que acionou o alerta',
    required: false,
  })
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @Headers('x-device-key') deviceKey?: string,
  ): Promise<AlertType> {
    return await this.alertsService.create(createAlertDto, deviceKey);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os alertas',
    description: 'Retorna a lista completa de alertas do sistema.',
  })
  @ApiOkResponse({
    description: 'Lista de alertas recuperada com sucesso',
    type: [Alert],
  })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<Alert[]> {
    return await this.alertsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de um alerta específico',
    description: 'Recupera informações detalhadas de um alerta pelo ID.',
  })
  @ApiOkResponse({
    description: 'Alerta encontrado',
    type: Alert,
  })
  @ApiNotFoundResponse({
    description: 'Alerta não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do alerta',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<AlertType> {
    return await this.alertsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um alerta',
    description: 'Atualiza os dados de um alerta existente.',
  })
  @ApiOkResponse({
    description: 'Alerta atualizado com sucesso',
    type: Alert,
  })
  @ApiNotFoundResponse({
    description: 'Alerta não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do alerta',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async update(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<AlertType> {
    return await this.alertsService.update(id, updateAlertDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um alerta',
    description: 'Remove um alerta do sistema.',
  })
  @ApiOkResponse({
    description: 'Alerta deletado com sucesso',
    type: Alert,
  })
  @ApiNotFoundResponse({
    description: 'Alerta não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do alerta',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<AlertType> {
    return await this.alertsService.remove(id);
  }
}
