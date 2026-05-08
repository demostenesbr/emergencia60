import { Injectable } from '@nestjs/common';
import { CreateElderlyDto } from './dto/create-elderly.dto';
import { UpdateElderlyDto } from './dto/update-elderly.dto';

@Injectable()
export class ElderlyService {
  create(createElderlyDto: CreateElderlyDto) {
    return 'This action adds a new elderly';
  }

  findAll() {
    return `This action returns all elderly`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elderly`;
  }

  update(id: number, updateElderlyDto: UpdateElderlyDto) {
    return `This action updates a #${id} elderly`;
  }

  remove(id: number) {
    return `This action removes a #${id} elderly`;
  }
}
