import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova notificação',
    description: 'Cria uma nova notificação para ser enviada aos usuários.',
  })
  @ApiCreatedResponse({
    description: 'Notificação criada com sucesso',
    type: Notification,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  @ApiBearerAuth('bearer')
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as notificações',
    description: 'Retorna a lista completa de notificações do sistema.',
  })
  @ApiOkResponse({
    description: 'Lista de notificações recuperada com sucesso',
    type: [Notification],
  })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<Notification[]> {
    return await this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de uma notificação específica',
    description: 'Recupera informações de uma notificação pelo ID.',
  })
  @ApiOkResponse({
    description: 'Notificação encontrada',
    type: Notification,
  })
  @ApiNotFoundResponse({
    description: 'Notificação não encontrada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da notificação',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<Notification> {
    return await this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma notificação',
    description: 'Atualiza os dados de uma notificação existente.',
  })
  @ApiOkResponse({
    description: 'Notificação atualizada com sucesso',
    type: Notification,
  })
  @ApiNotFoundResponse({
    description: 'Notificação não encontrada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da notificação',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationsService.update(id, updateNotificationDto);
  }

  @Patch(':id/read')
  @ApiOperation({
    summary: 'Marcar notificação como lida',
    description: 'Marca uma notificação específica como lida pelo usuário.',
  })
  @ApiOkResponse({
    description: 'Notificação marcada como lida com sucesso',
    type: Notification,
  })
  @ApiNotFoundResponse({
    description: 'Notificação não encontrada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da notificação',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async markRead(@Param('id') id: string): Promise<Notification> {
    return await this.notificationsService.markRead(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma notificação',
    description: 'Remove uma notificação do sistema.',
  })
  @ApiOkResponse({
    description: 'Notificação deletada com sucesso',
    type: Notification,
  })
  @ApiNotFoundResponse({
    description: 'Notificação não encontrada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da notificação',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<Notification> {
    return await this.notificationsService.remove(id);
  }
}
