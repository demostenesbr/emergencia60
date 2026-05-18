# 🚀 Backend AI Specification — Emergência 60+

## 🎯 Objetivo

Gerar automaticamente a estrutura completa do backend do projeto **Emergência 60+**, utilizando:

* NestJS
* Prisma ORM
* PostgreSQL
* Redis + BullMQ
* JWT Authentication
* Arquitetura modular e escalável

---

## 🏗️ Arquitetura

O backend deve seguir o padrão:

* Controller → entrada HTTP
* Service → regra de negócio
* Repository → acesso ao banco (Prisma)
* Queue → envio assíncrono
* Worker → processamento

---

## 📦 Estrutura de diretórios

src/

* modules/
* prisma/
* queue/
* workers/
* common/
* config/

---

## 🔐 Autenticação

### Estratégia

* JWT (access_token)
* Refresh Token
* Device API Key (para ESP32)

---

### Endpoints

POST /auth/login
POST /auth/refresh

---

## 👤 Módulos obrigatórios

### Auth

* login
* refresh token

### Users

* CRUD básico

### Devices

* registrar dispositivo
* heartbeat
* status

### Alerts

* criar alerta
* histórico

### Notifications

* envio de notificações

---

## 🔌 Integração com IoT (ESP32)

### Header obrigatório:

x-device-key: {API_KEY}

---

### Endpoint

POST /alerts

Payload:

{
"deviceId": "ESP32-001",
"type": "EMERGENCY",
"batteryLevel": 80
}

---

### Regras

* validar API Key
* evitar duplicidade (5 segundos)
* registrar alerta
* enviar para fila

---

## 🧠 Regras de negócio

* Um dispositivo pertence a um idoso
* Um idoso pode ter vários contatos
* Alertas devem ser enviados para múltiplos contatos
* Prioridade: envio imediato

---

## 🗄️ Banco de dados (Prisma)

Entidades principais:

User

* id
* email
* password
* role

Elderly

* id
* name

Device

* id
* serialNumber
* apiKey
* batteryLevel
* lastHeartbeat

Alert

* id
* type
* status
* createdAt

Contact

* id
* phone
* relationship

---

## 🔁 Fila (BullMQ)

Fila:

notifications

Jobs:

* send-alert

---

## ⚙️ Worker

O worker deve:

* consumir fila
* enviar SMS
* enviar Push Notification
* suportar retry automático

---

## 🐳 Docker

Serviços obrigatórios:

* api (NestJS)
* postgres
* redis

---

## 🔄 Fluxo principal

ESP32 → API → Prisma → Redis → Worker → SMS/Push

---

## ⚠️ Regras obrigatórias

* Não acessar Prisma direto no Controller
* Usar Repository Pattern
* Separar responsabilidades
* Usar DTOs
* Validar entrada de dados

## 🔧 Build e TypeScript

* O build do backend deve ser executado com `npm run build` dentro de `apps/backend`.
* O `tsconfig.build.json` deve restringir os tipos do build para `node`, evitando conflito entre `@types/jest` e `@types/mocha`.
* Arquivos de teste precisam ficar fora do build de produção.

## ⚙️ Variáveis de ambiente

* O backend deve ler `HOST` e `PORT` no bootstrap, com `HOST=0.0.0.0` como padrão de desenvolvimento.
* A autenticação JWT deve ler `JWT_ACCESS_SECRET` para access tokens.
* O refresh token deve ler `JWT_REFRESH_SECRET`.
* Ambos os secrets precisam ter fallback local seguro para desenvolvimento, usando `emergencia60-access-secret` e `emergencia60-refresh-secret`.
* O Redis deve aceitar `REDIS_PASSWORD` e usar `redis123` como fallback local, para ficar compatível com o `docker-compose.yml`.

## 📚 Swagger local

* A documentação da API deve ficar disponível em `http://localhost:3000/docs` durante o desenvolvimento local.
* O bootstrap deve exibir a URL completa da Swagger UI no console ao iniciar o backend.

## 🔐 Strategies de Auth

* Toda strategy derivada de `PassportStrategy` deve implementar `validate(payload)`.
* `JwtStrategy` e `RefreshStrategy` devem retornar um payload tipado e compatível com `JwtPayload`.

---

## 🧪 Logs e confiabilidade

* Logar criação de alertas
* Logar falhas de envio
* Retry automático (5 tentativas)

---

## 🚀 Resultado esperado

A IA deve gerar:

* módulos completos
* controllers
* services
* repositories
* integração com Prisma
* integração com Redis/BullMQ
* autenticação JWT funcionando
* projeto rodando com Docker

---

## 🔚 Instrução final

Gerar todos os arquivos necessários para um backend funcional, seguindo a arquitetura definida, pronto para execução com:

npm install
docker-compose up
npm run start:dev
