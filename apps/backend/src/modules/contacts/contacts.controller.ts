import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Contact } from './entities/contact.entity'; import { Contact as ContactType } from '@prisma/client';
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
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo contato',
    description: 'Registra um novo contato para um idoso no sistema.',
  })
  @ApiCreatedResponse({
    description: 'Contato criado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  async create(@Body() createContactDto: CreateContactDto): Promise<ContactType> {
    return await this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os contatos',
    description: 'Retorna a lista completa de contatos registrados no sistema.',
  })
  @ApiOkResponse({
    description: 'Lista de contatos recuperada com sucesso',
  })
  @ApiBearerAuth('bearer')
  async findAll(): Promise<Contact[]> {
    return await this.contactsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de um contato específico',
    description: 'Recupera informações de um contato pelo ID.',
  })
  @ApiOkResponse({
    description: 'Contato encontrado',
  })
  @ApiNotFoundResponse({
    description: 'Contato não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do contato',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async findOne(@Param('id') id: string): Promise<ContactType> {
    return await this.contactsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um contato',
    description: 'Atualiza os dados de um contato existente.',
  })
  @ApiOkResponse({
    description: 'Contato atualizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Contato não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do contato',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<ContactType> {
    return await this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um contato',
    description: 'Remove um contato do sistema.',
  })
  @ApiOkResponse({
    description: 'Contato deletado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Contato não encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do contato',
    type: 'string',
  })
  @ApiBearerAuth('bearer')
  async remove(@Param('id') id: string): Promise<ContactType> {
    return await this.contactsService.remove(id);
  }
}
