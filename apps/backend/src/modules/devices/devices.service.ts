import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DeviceStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DevicesRepository } from './devices.repository';

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DevicesRepository) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.devicesRepository.create({
      ...createDeviceDto,
      apiKey: createDeviceDto.apiKey ?? randomUUID(),
    });
  }

  findAll() {
    return this.devicesRepository.findAll();
  }

  async findOne(id: string) {
    const device = await this.devicesRepository.findById(id);

    if (!device) {
      throw new NotFoundException('Dispositivo não encontrado');
    }

    return device;
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return this.devicesRepository.update(id, updateDeviceDto);
  }

  remove(id: string) {
    return this.devicesRepository.remove(id);
  }

  async heartbeat(serialNumber: string, apiKey: string | undefined, data: UpdateDeviceDto) {
    if (!apiKey) {
      throw new UnauthorizedException('Header x-device-key é obrigatório');
    }

    const device = await this.devicesRepository.findBySerialNumber(serialNumber);

    if (!device) {
      throw new NotFoundException('Dispositivo não encontrado');
    }

    if (device.apiKey !== apiKey) {
      throw new UnauthorizedException('API key inválida');
    }

    return this.devicesRepository.heartbeat(device.id, {
      batteryLevel: data.batteryLevel,
      signalStrength: data.signalStrength,
      status:
        data.batteryLevel !== undefined && data.batteryLevel < 20
          ? DeviceStatus.LOW_BATTERY
          : DeviceStatus.ONLINE,
    });
  }
}
