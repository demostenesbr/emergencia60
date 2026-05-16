import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class DeviceKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const deviceKey = request.headers['x-device-key'];

    if (!deviceKey || typeof deviceKey !== 'string') {
      throw new UnauthorizedException('Header x-device-key is required');
    }

    return true;
  }
}
