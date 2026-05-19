# Backend

API principal do projeto Emergência 60+, implementada com NestJS.

## Objetivo

Este app concentra a camada de servidor do sistema: autenticação, usuários, idosos, contatos, dispositivos, alertas, notificações, WebSocket, filas e integração com o banco.

## Estrutura

- `src/common/`: utilitários, guardas e componentes compartilhados
- `src/config/`: configuração de ambiente e Swagger
- `src/modules/alerts/`: registro e processamento de alertas
- `src/modules/auth/`: autenticação e autorização
- `src/modules/contacts/`: contatos vinculados aos usuários
- `src/modules/devices/`: cadastro e controle de dispositivos
- `src/modules/elderly/`: perfil e dados do idoso
- `src/modules/health/`: endpoint de saúde da API
- `src/modules/notifications/`: integração com notificações
- `src/modules/users/`: usuários do sistema
- `src/modules/websocket/`: eventos em tempo real
- `src/prisma/`: módulo Prisma e cliente de banco
- `src/queue/`: filas BullMQ
- `src/workers/`: workers de processamento assíncrono

## Tecnologias

- NestJS
- Prisma
- PostgreSQL
- Redis
- BullMQ
- Socket.IO
- Swagger
- JWT

## Documentação disponível

- `API_DOCUMENTATION.md`
- `SWAGGER_ENDPOINTS_SUMMARY.md`
- `QUICK_START_SWAGGER.md`
- `src/modules/websocket/WEBSOCKET.md`

## Como executar

```powershell
cd apps/backend
npm install
npm run build
```

Para desenvolvimento:

```powershell
npm run start:dev
```

Para testes:

```powershell
npm run test
npm run test:e2e
```

## Observações

- O backend usa a configuração atual em `src/config/swagger.config.ts`.
- O cliente Prisma e a integração com o banco ficam centralizados em `src/prisma/`.
- O comando de build atual é `npm run build` dentro de `apps/backend`.