import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Device } from '@prisma/client';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return await this.devicesService.create(createDeviceDto);
  }

  @Get()
  async findAll(): Promise<Device[]> {
    return await this.devicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return await this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.remove(id);
  }

  @Post(':serialNumber/heartbeat')
  async heartbeat(
    @Param('serialNumber') serialNumber: string,
    @Headers('x-device-key') apiKey: string | undefined,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return await this.devicesService.heartbeat(
      serialNumber,
      apiKey,
      updateDeviceDto,
    );
  }
}
