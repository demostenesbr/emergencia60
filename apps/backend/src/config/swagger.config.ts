import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Emergência 60+ API')
  .setDescription(
    'API REST do sistema Emergência 60+. Plataforma de monitoramento e gerenciamento de alertas para idosos. Oferece endpoints para gerenciamento de usuários, dispositivos, alertas, notificações e comunicação em tempo real via WebSocket.',
  )
  .setVersion('1.0.0')
  .setContact(
    'Emergência 60+',
    'https://github.com/seu-repo',
    'support@emergencia60.com',
  )
  .setLicense('Licença Proprietária', '')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'bearer',
  )
  .addTag('Health', 'Verificação de saúde da API')
  .addTag('Auth', 'Autenticação e gerenciamento de tokens')
  .addTag('Users', 'Gerenciamento de usuários do sistema')
  .addTag('Elderly', 'Gerenciamento de idosos monitorados')
  .addTag('Contacts', 'Gerenciamento de contatos dos idosos')
  .addTag('Devices', 'Gerenciamento de dispositivos de monitoramento')
  .addTag('Alerts', 'Gerenciamento de alertas do sistema')
  .addTag('Notifications', 'Gerenciamento de notificações dos usuários')
  .addTag('WebSocket', 'Comunicação em tempo real via WebSocket')
  .build();
