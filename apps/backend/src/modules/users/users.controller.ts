import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
    description:
      'Cria um novo usuário no sistema. Pode ser um cuidador, administrador ou outro tipo de usuário.',
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna a lista completa de usuários do sistema.',
  })
  @ApiOkResponse({
    description: 'Lista de usuários recuperada com sucesso',
  })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<any[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de um usuário específico',
    description: 'Recupera informações detalhadas de um usuário pelo ID.',
  })
  @ApiOkResponse({
    description: 'Usuário encontrado',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um usuário',
    description: 'Atualiza os dados de um usuário existente.',
  })
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuário',
    description: 'Remove um usuário do sistema.',
  })
  @ApiOkResponse({
    description: 'Usuário deletado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<any> {
    return await this.usersService.remove(id);
  }
}
