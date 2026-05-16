import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Emergência 60+ API')
  .setDescription('API do sistema Emergência 60+')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
