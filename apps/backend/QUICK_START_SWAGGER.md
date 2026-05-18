# 🎉 Swagger Endpoints - Guia Rápido

## ✅ O que foi realizado

A documentação Swagger foi **completamente integrada** ao backend do Emergência 60+. Todos os endpoints REST foram documentados seguindo a estrutura atual do projeto.

---

## 🚀 Como Acessar

### 1. **Iniciar o Backend**
```bash
cd apps/backend
npm install
npm run start:dev
```

### 2. **Abrir Swagger UI**
Cole esta URL no navegador:
```
http://localhost:3000/api/v1/docs
```

---

## 📊 Documentação Incluída

### **REST API (41 Endpoints)**
Todos organizados em 8 tags principais:

```
✅ Auth (2)           - Login e renovação de tokens
✅ Users (5)          - Gerenciamento de usuários
✅ Elderly (5)        - Registro de idosos
✅ Contacts (5)       - Contatos dos idosos
✅ Devices (6)        - Dispositivos de monitoramento
✅ Alerts (5)         - Sistema de alertas
✅ Notifications (6)  - Notificações para usuários
✅ Health (1)         - Status da API
```

### **WebSocket API (5 Eventos)**
Documentação completa com exemplos:

```
✅ createWebsocket    - Criar registros
✅ findAllWebsocket   - Listar todos
✅ findOneWebsocket   - Obter específico
✅ updateWebsocket    - Atualizar
✅ removeWebsocket    - Remover
```

---

## 📚 Arquivos de Documentação Criados

| Arquivo | Descrição |
|---------|-----------|
| `API_DOCUMENTATION.md` | Documentação geral com guia de autenticação |
| `SWAGGER_ENDPOINTS_SUMMARY.md` | Tabela rápida de todos os endpoints |
| `src/modules/websocket/WEBSOCKET.md` | Guia completo de WebSocket com exemplos |
| `src/modules/websocket/websocket.events.spec.ts` | Especificação estruturada dos eventos |

---

## 🔑 Autenticação

### Testar com Bearer Token

1. **Faça Login** em `POST /auth/login`
2. **Copie o token** retornado
3. **Clique em "Authorize"** no Swagger (botão verde no canto superior)
4. **Cole o token** (sem "Bearer" antes)
5. **Seus endpoints protegidos estarão desbloqueados!**

---

## 🎯 Recursos do Swagger

- ✅ **Visualizar todos os endpoints**
- ✅ **Testar endpoints diretamente**
- ✅ **Ver exemplos de requisição e resposta**
- ✅ **Autenticação integrada com Bearer Token**
- ✅ **Modelos de dados com validação**
- ✅ **Descrições detalhadas de cada operação**

---

## 📋 Estrutura do Swagger

### Exemplo: Endpoint de Alerts

```
POST /api/v1/alerts
├─ Tag: Alerts
├─ Descrição: "Criar um novo alerta"
├─ Parâmetro: x-device-key (opcional)
├─ Body: CreateAlertDto
├─ Response 201: Alert criado
├─ Response 400: Dados inválidos
└─ Autenticação: Bearer Token (opcional)
```

---

## 💻 Exemplos de Requisição

### cURL - Listar Alertas
```bash
curl -X GET http://localhost:3000/api/v1/alerts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### JavaScript - Criar Alerta
```javascript
const response = await fetch('http://localhost:3000/api/v1/alerts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    deviceId: 'device-123',
    type: 'emergency',
    batteryLevel: 85
  })
});
const alert = await response.json();
```

### Python - Listar Idosos
```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}

response = requests.get('http://localhost:3000/api/v1/elderly', headers=headers)
elderly = response.json()
```

---

## 🔗 Recursos Relacionados

| Recurso | Link |
|---------|------|
| Swagger UI | http://localhost:3000/api/v1/docs |
| API Geral | [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) |
| WebSocket | [WEBSOCKET.md](./src/modules/websocket/WEBSOCKET.md) |
| Endpoints | [SWAGGER_ENDPOINTS_SUMMARY.md](./SWAGGER_ENDPOINTS_SUMMARY.md) |
| Schema DB | [prisma/schema.prisma](./prisma/schema.prisma) |

---

## ⚙️ Configuração do Swagger

**Arquivo**: `src/config/swagger.config.ts`

- Título: "Emergência 60+ API"
- Versão: 1.0.0
- Autenticação: Bearer Token (JWT)
- Tags: 8 categories
- Documentação: Completa com exemplos

---

## 🧪 Testar Endpoints

### Opção 1: Swagger UI (Recomendado)
1. Acesse http://localhost:3000/api/v1/docs
2. Expanda um endpoint
3. Clique "Try it out"
4. Preencha os dados
5. Clique "Execute"

### Opção 2: Postman
1. Importe via URL: `http://localhost:3000/api/v1-json`
2. Configure Bearer Token
3. Teste os endpoints

### Opção 3: Command Line
```bash
# Com autenticação
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/v1/users
```

---

## ✨ Destaques

- **Todos os 41 endpoints documentados** ✓
- **5 eventos WebSocket com exemplos** ✓
- **Autenticação Bearer Token integrada** ✓
- **DTOs com validação automática** ✓
- **Descrições em português** ✓
- **Exemplos de requisição e resposta** ✓

---

## 📝 Próximos Passos

1. Iniciar o servidor backend
2. Acessar Swagger UI
3. Explorar os endpoints
4. Fazer login se necessário
5. Testar a API interativamente

---

**Versão**: 1.0.0  
**Atualizado**: 17 de maio de 2024  
**Endpoint Swagger**: http://localhost:3000/api/v1/docs
