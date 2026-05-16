import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST', '0.0.0.0');
  const port = configService.get<number>('PORT', 3000);
  const swaggerPath = 'docs';

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerPath, app, document);
  await app.listen(port, host);

  const baseUrl = host === '0.0.0.0' ? 'http://localhost' : `http://${host}`;
  console.log(`Swagger UI available at ${baseUrl}:${port}/${swaggerPath}`);
}

bootstrap().catch(console.error);
