import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email já cadastrado');
    }

    const password = await bcrypt.hash(createUserDto.password, 10);

    return this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password,
      phone: createUserDto.phone,
      role: (createUserDto.role ?? 'FAMILY') as UserRole,
    });
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email já cadastrado');
      }
    }

    const data: Record<string, unknown> = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.role) {
      data.role = updateUserDto.role;
    }

    return this.usersRepository.update(id, data);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
