# Docker Setup Guide

This project includes a complete Docker setup with PostgreSQL, Redis, and the NestJS backend.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)

## Quick Start

### 1. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.docker .env.local
```

Edit `.env.local` with your preferred database and Redis credentials.

### 2. Start Services

```bash
docker-compose up -d
```

This will:
- Create and start a PostgreSQL database
- Create and start a Redis instance
- Build and start the NestJS backend

### 3. Run Database Migrations

```bash
docker-compose exec backend npx prisma migrate deploy
```

Or for development with seed data:

```bash
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npx prisma db seed
```

### 4. Access Services

- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/docs
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Development Workflow

### Hot Reload

To enable hot reload during development, uncomment the `command` in `docker-compose.yml`:

```yaml
backend:
  # ... other config
  command: npm run start:dev
```

Then restart the backend service:

```bash
docker-compose restart backend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Execute Commands in Container

```bash
# Run Prisma commands
docker-compose exec backend npx prisma studio

# Run tests
docker-compose exec backend npm test

# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d emergencia60_db

# Access Redis CLI
docker-compose exec redis redis-cli -a redis123
```

## Production Deployment

For production, consider:

1. **Use `.env.production`** with strong passwords
2. **Remove volume mounts** from the backend in docker-compose.yml
3. **Update image tags** (don't use `latest`)
4. **Configure logging** for better monitoring
5. **Set up backup strategies** for PostgreSQL and Redis
6. **Use Docker networks** with proper security rules

## Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

## Troubleshooting

### Database Connection Failed

Check that PostgreSQL is healthy:
```bash
docker-compose logs postgres
```

### Redis Connection Failed

Check Redis status:
```bash
docker-compose logs redis
```

### Backend Port Already in Use

Change the port in `docker-compose.yml`:
```yaml
backend:
  ports:
    - "3001:3000"  # External:Internal
```

### Rebuild Backend Image

```bash
docker-compose build --no-cache backend
```

## Database Backup & Restore

### Backup PostgreSQL

```bash
docker-compose exec postgres pg_dump -U postgres emergencia60_db > backup.sql
```

### Restore PostgreSQL

```bash
docker-compose exec -T postgres psql -U postgres emergencia60_db < backup.sql
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/deployment/docker)
- [Prisma Docker Guide](https://www.prisma.io/docs/orm/overview/databases/using-prisma-with-postgresql)
