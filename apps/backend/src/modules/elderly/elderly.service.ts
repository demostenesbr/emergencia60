import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateElderlyDto } from './dto/create-elderly.dto';
import { UpdateElderlyDto } from './dto/update-elderly.dto';
import { ElderlyRepository } from './elderly.repository';

@Injectable()
export class ElderlyService {
  constructor(private readonly elderlyRepository: ElderlyRepository) {}

  create(createElderlyDto: CreateElderlyDto) {
    return this.elderlyRepository.create({
      ...createElderlyDto,
      birthDate: createElderlyDto.birthDate ? new Date(createElderlyDto.birthDate) : undefined,
    });
  }

  findAll() {
    return this.elderlyRepository.findAll();
  }

  async findOne(id: string) {
    const elderly = await this.elderlyRepository.findById(id);

    if (!elderly) {
      throw new NotFoundException('Idoso não encontrado');
    }

    return elderly;
  }

  update(id: string, updateElderlyDto: UpdateElderlyDto) {
    return this.elderlyRepository.update(id, {
      ...updateElderlyDto,
      birthDate: updateElderlyDto.birthDate ? new Date(updateElderlyDto.birthDate) : undefined,
    });
  }

  remove(id: string) {
    return this.elderlyRepository.remove(id);
  }
}
