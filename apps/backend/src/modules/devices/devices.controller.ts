import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Device } from '@prisma/client';
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
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar um novo dispositivo',
    description:
      'Cria um novo dispositivo de monitoramento no sistema. Geralmente um relógio de emergência ou pulseira.',
  })
  @ApiCreatedResponse({
    description: 'Dispositivo registrado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return await this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os dispositivos',
    description:
      'Retorna a lista completa de dispositivos registrados no sistema.',
  })
  @ApiOkResponse({
    description: 'Lista de dispositivos recuperada com sucesso',
  })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<Device[]> {
    return await this.devicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de um dispositivo específico',
    description: 'Recupera informações detalhadas de um dispositivo pelo ID.',
  })
  @ApiOkResponse({
    description: 'Dispositivo encontrado',
  })
  @ApiNotFoundResponse({
    description: 'Dispositivo não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do dispositivo',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um dispositivo',
    description: 'Atualiza as informações de um dispositivo existente.',
  })
  @ApiOkResponse({
    description: 'Dispositivo atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Dispositivo não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do dispositivo',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return await this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um dispositivo',
    description: 'Remove um dispositivo do sistema.',
  })
  @ApiOkResponse({
    description: 'Dispositivo deletado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Dispositivo não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do dispositivo',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.remove(id);
  }

  @Post(':serialNumber/heartbeat')
  @ApiOperation({
    summary: 'Enviar heartbeat de dispositivo',
    description:
      'Endpoint para o dispositivo enviar sinais de vida (heartbeat) periodicamente. Serve para monitorar a saúde do dispositivo.',
  })
  @ApiOkResponse({
    description: 'Heartbeat recebido e processado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Dispositivo não encontrado',
  })
  @ApiParam({
    name: 'serialNumber',
    description: 'Número de série do dispositivo',
    type: 'string',
  })
  @ApiHeader({
    name: 'x-device-key',
    description: 'Chave de autenticação do dispositivo',
    required: false,
  })
  async heartbeat(
    @Param('serialNumber') serialNumber: string,
    @Headers('x-device-key') apiKey: string | undefined,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return await this.devicesService.heartbeat(
      serialNumber,
      apiKey,
      updateDeviceDto,
    );
  }
}
