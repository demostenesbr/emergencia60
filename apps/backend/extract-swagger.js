const { NestFactory } = require('@nestjs/core');
const { SwaggerModule } = require('@nestjs/swagger');
const { AppModule } = require('./dist/src/app.module');
const { swaggerConfig } = require('./dist/src/config/swagger.config');

async function generate() {
  try {
    const app = await NestFactory.create(AppModule, { logger: false });
    app.setGlobalPrefix('api/v1');
    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      deepScanRoutes: true,
    });
    
    console.log('--- PATH KEYS ---');
    Object.keys(document.paths).forEach(k => console.log(k));
    
    console.log('\n--- SCHEMA KEYS ---');
    if (document.components && document.components.schemas) {
      Object.keys(document.components.schemas).forEach(k => console.log(k));
    }
    
    await app.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

generate();
