# emergencia60

Sistema de alerta de emergência para idosos com três camadas principais no workspace: backend, frontend e mobile.

## Links de design

Projeto Figma principal:
https://www.figma.com/design/BFPobDjzjU1PErCvVp1E4D/Emerg%C3%AAncia-60-?node-id=0-1&p=f&t=uddJcs2wwY3jTuAo-0

Inspirações:
https://www.figma.com/community/file/1610021907811642485
https://www.figma.com/community/file/1527618855496826535
https://www.figma.com/community/file/1481906935181630982

## Visão Geral

O repositório está organizado para separar a API, a interface principal e o app mobile. A base atual combina NestJS no backend e Flutter nas camadas de apresentação.

## Estrutura Atual

- `apps/backend/`: API NestJS e regras de negócio do servidor
- `apps/frontend/`: aplicação Flutter da camada de interface
- `apps/mobile/`: aplicação Flutter mobile com arquitetura por módulos

### Backend

O backend fica em `apps/backend` e concentra a API HTTP, WebSocket, fila e acesso ao banco.

Principais pastas:

- `src/common/`
- `src/config/`
- `src/modules/alerts/`
- `src/modules/auth/`
- `src/modules/contacts/`
- `src/modules/devices/`
- `src/modules/elderly/`
- `src/modules/health/`
- `src/modules/notifications/`
- `src/modules/users/`
- `src/modules/websocket/`
- `src/prisma/`
- `src/queue/`
- `src/workers/`

Tecnologias e responsabilidades:

- NestJS
- Prisma
- PostgreSQL
- Redis e BullMQ para filas e workers
- Socket.IO para eventos em tempo real
- Swagger para documentação da API
- JWT para autenticação

### Frontend

O frontend fica em `apps/frontend` e hoje está em um scaffold Flutter simples, preparado como base da camada de interface.

Estrutura principal:

- `lib/main.dart`

Esse app usa a estrutura padrão do Flutter e serve como ponto de partida para a experiência visual principal do projeto.

### Mobile

O mobile fica em `apps/mobile` e já está organizado em camadas mais explícitas.

Estrutura principal:

- `lib/core/config/`
- `lib/core/network/`
- `lib/core/services/`
- `lib/modules/alerts/`
- `lib/modules/auth/`
- `lib/modules/elderly/`
- `lib/shared/models/`
- `lib/shared/widgets/`

Essa aplicação usa:

- Flutter
- flutter_bloc para estado
- Dio para consumo da API
- flutter_secure_storage para armazenamento seguro

## Ambiente e Execução

Pré-requisitos principais:

- Node.js para o backend
- Flutter SDK para as apps `frontend` e `mobile`
- Docker e Docker Compose para serviços de apoio

### Backend

```powershell
cd apps/backend
npm install
npm run build
```

### Frontend

```powershell
cd apps/frontend
flutter pub get
flutter run
```

### Mobile

```powershell
cd apps/mobile
flutter pub get
flutter run
```

### Docker

O arquivo `docker-compose.yml` na raiz centraliza a orquestração dos serviços de infraestrutura usados pelo backend.

## Observações

- A documentação antiga que citava `apps/api`, `web-admin` e `libs/` não corresponde mais à estrutura atual.
- Se quiser, o próximo passo natural é detalhar a responsabilidade de cada módulo do backend ou separar o README em arquivos por app.
