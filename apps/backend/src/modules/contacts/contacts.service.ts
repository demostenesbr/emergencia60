import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.create(createContactDto);
  }

  findAll() {
    return this.contactsRepository.findAll();
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findById(id);

    if (!contact) {
      throw new NotFoundException('Contato não encontrado');
    }

    return contact;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  remove(id: string) {
    return this.contactsRepository.remove(id);
  }
}
