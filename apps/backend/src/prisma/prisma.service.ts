import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient;
  private pool: pg.Pool;
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    this.logger.log('Initializing PrismaService...');
    
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    this.logger.log(`Using DATABASE_URL: ${databaseUrl.replace(/:[^@]*@/, ':****@')}`);

    // Create a connection pool
    this.pool = new pg.Pool({ connectionString: databaseUrl });

    // Create Prisma adapter
    const adapter = new PrismaPg(this.pool);

    // Create Prisma client
    this.client = new PrismaClient({
      adapter,
      log: [
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to database...');
    try {
      await this.client.$connect();
      this.logger.log('✅ Database connected successfully');
    } catch (error) {
      this.logger.error(`Failed to connect to database: ${error}`);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    await this.pool.end();
  }

  // Proxy all important Prisma methods/models
  get user() {
    return this.client.user;
  }

  get elderly() {
    return this.client.elderly;
  }

  get device() {
    return this.client.device;
  }

  get contact() {
    return this.client.contact;
  }

  get alert() {
    return this.client.alert;
  }

  get notification() {
    return this.client.notification;
  }

  async $connect() {
    return this.client.$connect();
  }

  async $disconnect() {
    return this.client.$disconnect();
  }

  $transaction(...args: any[]) {
    return (this.client as any).$transaction(...args);
  }
}
