import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WorkersService {
  private readonly logger = new Logger(WorkersService.name);

  async sendSms(destination: string, message: string) {
    this.logger.log(`SMS -> ${destination}: ${message}`);
  }

  async sendPush(destination: string, message: string) {
    this.logger.log(`Push -> ${destination}: ${message}`);
  }

  async sendEmail(destination: string, message: string) {
    this.logger.log(`Email -> ${destination}: ${message}`);
  }
}
