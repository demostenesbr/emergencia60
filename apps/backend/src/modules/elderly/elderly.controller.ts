import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Elderly } from '@prisma/client';
import { ElderlyService } from './elderly.service';
import { CreateElderlyDto } from './dto/create-elderly.dto';
import { UpdateElderlyDto } from './dto/update-elderly.dto';

@Controller('elderly')
export class ElderlyController {
  constructor(private readonly elderlyService: ElderlyService) {}

  @Post()
  async create(@Body() createElderlyDto: CreateElderlyDto): Promise<Elderly> {
    return await this.elderlyService.create(createElderlyDto);
  }

  @Get()
  async findAll(): Promise<Elderly[]> {
    return await this.elderlyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Elderly> {
    return await this.elderlyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateElderlyDto: UpdateElderlyDto,
  ): Promise<Elderly> {
    return await this.elderlyService.update(id, updateElderlyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Elderly> {
    return await this.elderlyService.remove(id);
  }
}
