import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { Alert } from '@prisma/client';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @Headers('x-device-key') deviceKey?: string,
  ): Promise<Alert> {
    return await this.alertsService.create(createAlertDto, deviceKey);
  }

  @Get()
  async findAll(): Promise<Alert[]> {
    return await this.alertsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Alert> {
    return await this.alertsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<Alert> {
    return await this.alertsService.update(id, updateAlertDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Alert> {
    return await this.alertsService.remove(id);
  }
}
