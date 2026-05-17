import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Elderly } from '@prisma/client';
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
import { ElderlyService } from './elderly.service';
import { CreateElderlyDto } from './dto/create-elderly.dto';
import { UpdateElderlyDto } from './dto/update-elderly.dto';

@ApiTags('Elderly')
@Controller('elderly')
export class ElderlyController {
  constructor(private readonly elderlyService: ElderlyService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar um novo idoso',
    description:
      'Cria um novo registro de idoso no sistema para monitoramento.',
  })
  @ApiCreatedResponse({
    description: 'Idoso registrado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  async create(@Body() createElderlyDto: CreateElderlyDto): Promise<Elderly> {
    return await this.elderlyService.create(createElderlyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os idosos',
    description: 'Retorna a lista completa de idosos registrados no sistema.',
  })
  @ApiOkResponse({
    description: 'Lista de idosos recuperada com sucesso',
  })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<Elderly[]> {
    return await this.elderlyService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de um idoso específico',
    description:
      'Recupera informações detalhadas de um idoso pelo ID, incluindo contatos e dispositivos associados.',
  })
  @ApiOkResponse({
    description: 'Idoso encontrado',
  })
  @ApiNotFoundResponse({
    description: 'Idoso não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do idoso',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<Elderly> {
    return await this.elderlyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar informações de um idoso',
    description: 'Atualiza os dados de um idoso existente.',
  })
  @ApiOkResponse({
    description: 'Idoso atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Idoso não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do idoso',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async update(
    @Param('id') id: string,
    @Body() updateElderlyDto: UpdateElderlyDto,
  ): Promise<Elderly> {
    return await this.elderlyService.update(id, updateElderlyDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um idoso',
    description: 'Remove um registro de idoso do sistema.',
  })
  @ApiOkResponse({
    description: 'Idoso deletado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Idoso não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do idoso',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<Elderly> {
    return await this.elderlyService.remove(id);
  }
}
