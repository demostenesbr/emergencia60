export interface AppEnvironment {
  HOST: string;
  PORT: number;
  DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
}

function toNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default (): AppEnvironment => ({
  HOST: process.env.HOST ?? '0.0.0.0',
  PORT: toNumber(process.env.PORT, 3000),
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost:5432/emergencia60',
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET ?? 'emergencia60-access-secret',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ?? 'emergencia60-refresh-secret',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  REDIS_HOST: process.env.REDIS_HOST ?? 'localhost',
  REDIS_PORT: toNumber(process.env.REDIS_PORT, 6379),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? 'redis123',
});
