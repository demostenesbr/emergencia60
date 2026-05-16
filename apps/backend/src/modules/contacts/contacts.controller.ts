import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return await this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return await this.contactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    return await this.contactsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return await this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Contact> {
    return await this.contactsService.remove(id);
  }
}
