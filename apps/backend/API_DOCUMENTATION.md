
# Documentação da API - Emergência 60+

## 📚 Recursos de Documentação

A API do Emergência 60+ oferece documentação interativa e referência automática gerada pelo NestJS/Swagger.

### 1. **Swagger UI (REST API)**

Acesse a documentação interativa do Swagger UI em:

```
http://localhost:3000/docs
```

O Swagger UI permite:
- ✅ Visualizar todos os endpoints REST
- ✅ Testar endpoints diretamente
- ✅ Fazer login com Bearer Token
- ✅ Ver exemplos de requisição e resposta
- ✅ Autenticação automática para endpoints protegidos

#### Observação sobre o path do Swagger
- O Swagger é exposto em `/docs` (rota registrada em `apps/backend/src/main.ts` como `docs`). Não está dentro do prefixo global `/api/v1`.

---

### 2. **WebSocket API Documentation**

Consulte o guia completo de WebSocket em:

```
apps/backend/src/modules/websocket/WEBSOCKET.md
```

O WebSocket fornece comunicação em tempo real com os seguintes eventos:

- `createWebsocket` - Criar registro
- `findAllWebsocket` - Listar todos
- `findOneWebsocket` - Obter específico
- `updateWebsocket` - Atualizar
- `removeWebsocket` - Remover

**Conexão WebSocket:**
```javascript
const socket = io('http://localhost:3000');
socket.emit('findAllWebsocket');
```

Veja [WEBSOCKET.md](./src/modules/websocket/WEBSOCKET.md) para exemplos completos.

---

## 🔑 Autenticação

### Bearer Token

Todos os endpoints protegidos requerem um token Bearer JWT no header:

```
Authorization: Bearer <token>
```

### Fluxo de Autenticação

1. **Login** - Obtenha um `access_token` e `refresh_token`:
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "senha123"}'
   ```

2. **Use o Token** - Nos headers das requisições protegidas:
   ```bash
   curl http://localhost:3000/api/v1/users \
     -H "Authorization: Bearer <access_token>"
   ```

3. **Renovar Token** - Quando expirar:
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/refresh \
     -H "Content-Type: application/json" \
     -d '{"refreshToken": "<refresh_token>"}'
   ```

---

## 🚀 Quick Start

### 1. Verificar Status da API
```bash
curl http://localhost:3000/api/v1/health
```

### 2. Fazer Login
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "senha123"}' | jq -r '.access_token')

echo $TOKEN
```

### 3. Listar Usuários
```bash
curl http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📋 Estrutura de Resposta

### Sucesso (2xx)
```json
{
  "id": "uuid-123",
  "name": "Exemplo",
  "email": "user@example.com",
  "createdAt": "2024-05-17T10:30:00Z",
  "updatedAt": "2024-05-17T10:30:00Z"
}
```

### Erro (4xx/5xx)
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Descrição detalhada do erro"
}
```

---

## 🛠️ Environment Variables

Configure as seguintes variáveis de ambiente (usadas pelo NestJS e pelo container Docker):

```env
# Servidor
HOST=0.0.0.0
PORT=3000

# Banco de dados (Prisma usa DATABASE_URL)
# Em desenvolvimento local: postgresql://user:password@localhost:5432/emergencia60
# Em Docker Compose o serviço "postgres" é referenciado pelo nome do serviço:
# postgresql://<DB_USER>:<DB_PASSWORD>@postgres:5432/<DB_NAME>
DATABASE_URL=postgresql://user:password@localhost:5432/emergencia60

# JWT
JWT_SECRET=seu-secret-key
JWT_EXPIRATION=3600

# Redis (para fila de jobs)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

Observações:
- O arquivo `apps/backend/prisma.config.ts` lê `DATABASE_URL` do ambiente.
- No container Docker Compose, a variável `DATABASE_URL` já é montada para apontar ao serviço `postgres`.

---

## 📡 Formatos Suportados

- **Content-Type**: `application/json`
- **Response**: `application/json`

---

## ⚡ Performance e Limitações

- **Rate Limiting**: 100 requisições por minuto por IP
- **Timeout**: 30 segundos
- **Max Payload**: 10MB

---

## 🔗 Recursos Adicionais

- [Swagger UI](http://localhost:3000/docs) - Documentação interativa (rota registrada em `apps/backend/src/main.ts` como `docs`)
- [WebSocket Documentation](./src/modules/websocket/WEBSOCKET.md) - Comunicação em tempo real
- [Backend README](./README.md) - Instruções de setup
- [Banco de Dados Schema](./prisma/schema.prisma) - Estrutura de dados

---

## 🧭 Conexões e Arquitetura

- **NestJS**: ponto de entrada em `apps/backend/src/main.ts`. Principais configurações:
  - `app.setGlobalPrefix('api/v1')` — todos os endpoints REST ficam sob `/api/v1` (ex.: `/api/v1/auth/login`).
  - Swagger é exposto em `/docs` (não em `/api/v1/docs`).
  - Variáveis `HOST` e `PORT` controlam onde o processo escuta (por padrão `0.0.0.0:3000`).

- **Prisma**: schema em `apps/backend/prisma/schema.prisma` e configuração em `apps/backend/prisma.config.ts`.
  - `prisma.config.ts` usa `process.env.DATABASE_URL` para conectar ao banco.
  - Em Docker Compose, o `DATABASE_URL` é apontado para `postgres` (veja `docker-compose.yml`).

- **Docker / docker-compose**:
  - Serviço backend definido em `docker-compose.yml` como `backend` com `container_name: emergencia60_backend`.
  - Porta 3000 é mapeada do container para a máquina host: `3000:3000`. Portanto, o Swagger e os endpoints ficam disponíveis em `http://localhost:3000`.
  - Ver logs do container:

```bash
docker logs -f emergencia60_backend
# ou usando docker-compose
docker-compose logs -f backend
```

## ✅ Resumo de Endpoints (base `/api/v1`)

As rotas listadas abaixo usam o prefixo global `/api/v1`. Exemplos:

- `POST /api/v1/auth/login` - Realizar login
- `POST /api/v1/auth/refresh` - Renovar token de acesso

- `POST /api/v1/users` - Criar novo usuário
- `GET /api/v1/users` - Listar todos os usuários
- `GET /api/v1/users/:id` - Obter detalhes de um usuário
- `PATCH /api/v1/users/:id` - Atualizar usuário
- `DELETE /api/v1/users/:id` - Deletar usuário

- `POST /api/v1/elderly` - Registrar novo idoso
- `GET /api/v1/elderly` - Listar idosos
- `GET /api/v1/elderly/:id` - Obter detalhes de um idoso
- `PATCH /api/v1/elderly/:id` - Atualizar dados do idoso
- `DELETE /api/v1/elderly/:id` - Deletar registro do idoso

- `POST /api/v1/devices` - Registrar novo dispositivo
- `GET /api/v1/devices` - Listar dispositivos
- `GET /api/v1/devices/:id` - Obter dispositivo
- `PATCH /api/v1/devices/:id` - Atualizar dispositivo
- `DELETE /api/v1/devices/:id` - Deletar dispositivo
- `POST /api/v1/devices/:serialNumber/heartbeat` - Enviar heartbeat do dispositivo

- `POST /api/v1/alerts` - Criar novo alerta
- `GET /api/v1/alerts` - Listar alertas
- `GET /api/v1/alerts/:id` - Obter alerta
- `PATCH /api/v1/alerts/:id` - Atualizar alerta
- `DELETE /api/v1/alerts/:id` - Deletar alerta

- `POST /api/v1/notifications` - Criar notificação
- `GET /api/v1/notifications` - Listar notificações
- `GET /api/v1/notifications/:id` - Obter notificação
- `PATCH /api/v1/notifications/:id` - Atualizar notificação
- `PATCH /api/v1/notifications/:id/read` - Marcar como lida
- `DELETE /api/v1/notifications/:id` - Deletar notificação

- `GET /api/v1/health` - Verificar saúde da API

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação Swagger: `http://localhost:3000/docs`
2. Verifique os logs: `docker logs -f emergencia60_backend` ou `docker-compose logs -f backend`
3. Contate: support@emergencia60.com

---

**Última atualização**: 17 de maio de 2026

### v1.0.0 (2024-05-17)
- ✅ Documentação inicial da API REST
- ✅ Documentação completa do WebSocket
- ✅ Integração com Swagger UI
- ✅ Bearer Token Authentication

---

**Última atualização**: 17 de maio de 2024
