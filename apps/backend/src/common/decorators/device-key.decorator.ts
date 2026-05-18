import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DeviceKey = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest().headers['x-device-key'],
);
