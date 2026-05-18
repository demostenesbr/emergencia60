import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AlertStatus, AlertType } from '@prisma/client';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { AlertsRepository } from './alerts.repository';
import { DevicesRepository } from '../devices/devices.repository';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AlertsService {
  constructor(
    private readonly alertsRepository: AlertsRepository,
    private readonly devicesRepository: DevicesRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createAlertDto: CreateAlertDto, deviceKey?: string) {
    const device = await this.devicesRepository.findBySerialNumber(createAlertDto.deviceId);

    if (!device) {
      throw new NotFoundException('Dispositivo não encontrado');
    }

    if (!deviceKey || device.apiKey !== deviceKey) {
      throw new UnauthorizedException('API key inválida');
    }

    const recentAlert = await this.alertsRepository.findRecentByDeviceId(device.id);

    if (recentAlert) {
      throw new ConflictException('Alerta duplicado detectado nos últimos 5 segundos');
    }

    const alert = await this.alertsRepository.create({
      elderlyId: device.elderlyId,
      deviceId: device.id,
      type: createAlertDto.type as AlertType,
      status: (createAlertDto.status ?? 'PENDING') as AlertStatus,
      batteryLevel: createAlertDto.batteryLevel,
      description: createAlertDto.description,
    });

    await this.devicesRepository.update(device.id, {
      batteryLevel: createAlertDto.batteryLevel,
      lastEmergencyAt: new Date(),
    });

    await this.notificationsService.enqueueAlert(alert.id);

    return alert;
  }

  findAll() {
    return this.alertsRepository.findAll();
  }

  async findOne(id: string) {
    const alert = await this.alertsRepository.findById(id);

    if (!alert) {
      throw new NotFoundException('Alerta não encontrado');
    }

    return alert;
  }

  update(id: string, updateAlertDto: UpdateAlertDto) {
    return this.alertsRepository.update(id, {
      ...updateAlertDto,
      type: updateAlertDto.type ? (updateAlertDto.type as AlertType) : undefined,
      status: updateAlertDto.status ? (updateAlertDto.status as AlertStatus) : undefined,
    });
  }

  remove(id: string) {
    return this.alertsRepository.findById(id).then((alert) => {
      if (!alert) {
        throw new NotFoundException('Alerta não encontrado');
      }

      return this.alertsRepository.update(id, {
        status: 'RESOLVED' as AlertStatus,
        resolvedAt: new Date(),
      });
    });
  }
}
