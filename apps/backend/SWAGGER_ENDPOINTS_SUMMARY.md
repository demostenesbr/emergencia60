# 📋 Endpoints Swagger - Sumário Completo

## 🎯 Acessar Documentação Interativa

```
http://localhost:3000/api/v1/docs
```

---

## 📊 Resumo de Endpoints por Recurso

### 🔐 Auth (2 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/auth/login` | Realizar login |
| `POST` | `/auth/refresh` | Renovar token de acesso |

### 👥 Users (5 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/users` | Criar novo usuário |
| `GET` | `/users` | Listar todos os usuários |
| `GET` | `/users/:id` | Obter detalhes de um usuário |
| `PATCH` | `/users/:id` | Atualizar usuário |
| `DELETE` | `/users/:id` | Deletar usuário |

### 👴 Elderly (5 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/elderly` | Registrar novo idoso |
| `GET` | `/elderly` | Listar idosos |
| `GET` | `/elderly/:id` | Obter detalhes de um idoso |
| `PATCH` | `/elderly/:id` | Atualizar dados do idoso |
| `DELETE` | `/elderly/:id` | Deletar registro do idoso |

### 📱 Contacts (5 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/contacts` | Registrar novo contato |
| `GET` | `/contacts` | Listar contatos |
| `GET` | `/contacts/:id` | Obter contato |
| `PATCH` | `/contacts/:id` | Atualizar contato |
| `DELETE` | `/contacts/:id` | Deletar contato |

### 🔌 Devices (6 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/devices` | Registrar novo dispositivo |
| `GET` | `/devices` | Listar dispositivos |
| `GET` | `/devices/:id` | Obter dispositivo |
| `PATCH` | `/devices/:id` | Atualizar dispositivo |
| `DELETE` | `/devices/:id` | Deletar dispositivo |
| `POST` | `/devices/:serialNumber/heartbeat` | Enviar heartbeat do dispositivo |

### 🚨 Alerts (5 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/alerts` | Criar novo alerta |
| `GET` | `/alerts` | Listar alertas |
| `GET` | `/alerts/:id` | Obter alerta |
| `PATCH` | `/alerts/:id` | Atualizar alerta |
| `DELETE` | `/alerts/:id` | Deletar alerta |

### 📢 Notifications (6 endpoints)
| Método | Path | Descrição |
|--------|------|-----------|
| `POST` | `/notifications` | Criar notificação |
| `GET` | `/notifications` | Listar notificações |
| `GET` | `/notifications/:id` | Obter notificação |
| `PATCH` | `/notifications/:id` | Atualizar notificação |
| `PATCH` | `/notifications/:id/read` | Marcar como lida |
| `DELETE` | `/notifications/:id` | Deletar notificação |

### ❤️ Health (1 endpoint)
| Método | Path | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Verificar saúde da API |

---

## 🔌 WebSocket Events (5 eventos)

Documentação completa em: `apps/backend/src/modules/websocket/WEBSOCKET.md`

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `createWebsocket` | Bidirecional | Cria um novo registro |
| `findAllWebsocket` | Bidirecional | Lista todos os registros |
| `findOneWebsocket` | Bidirecional | Obtém um registro específico |
| `updateWebsocket` | Bidirecional | Atualiza um registro |
| `removeWebsocket` | Bidirecional | Remove um registro |

---

## 📈 Estatísticas

- **Total de Endpoints REST**: 41
- **Total de Eventos WebSocket**: 5
- **Módulos Documentados**: 8
- **Autenticação**: Bearer Token (JWT)

---

## 🚀 Como Usar

### 1. Iniciar o Backend
```bash
cd apps/backend
npm install
npm run start:dev
```

### 2. Acessar Swagger UI
```
http://localhost:3000/api/v1/docs
```

### 3. Autenticar (se necessário)
- Faça login em `/auth/login`
- Copie o `access_token` retornado
- Clique em "Authorize" no Swagger
- Cole o token (sem "Bearer " antes)

### 4. Testar Endpoints
- Expanda qualquer endpoint
- Clique em "Try it out"
- Preencha os parâmetros
- Clique em "Execute"

---

## 📝 Tags no Swagger

Todos os endpoints estão organizados por tags:

- 🔐 **Auth** - Autenticação
- 👥 **Users** - Usuários do sistema
- 👴 **Elderly** - Idosos monitorados
- 📱 **Contacts** - Contatos
- 🔌 **Devices** - Dispositivos
- 🚨 **Alerts** - Alertas
- 📢 **Notifications** - Notificações
- ❤️ **Health** - Status da API
- 🌐 **WebSocket** - Comunicação real-time

---

## 🔑 Autenticação

### Endpoints Públicos (sem token)
- `POST /auth/login`
- `GET /health`

### Endpoints Protegidos (requerem Bearer Token)
Todos os outros endpoints requerem autenticação com Bearer Token

---

## 💡 Dicas

1. **Copie o Token Completo**: `Authorization: Bearer <token>`
2. **Erros de CORS**: Já estão configurados em `main.ts`
3. **Validação**: DTO com `class-validator` validam automaticamente
4. **Respostas**: Sempre retornam JSON estruturado

---

## 📚 Documentação Completa

- **API REST**: [Swagger UI](http://localhost:3000/api/v1/docs)
- **WebSocket**: [WEBSOCKET.md](./src/modules/websocket/WEBSOCKET.md)
- **Geral**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Schema DB**: [schema.prisma](./prisma/schema.prisma)

---

**Atualizado em**: 17 de maio de 2024
**Versão**: 1.0.0
