# Mobile

Aplicação Flutter mobile do projeto Emergência 60+.

## Objetivo

Este app concentra a experiência mobile com autenticação, dashboard de alertas e tela de emergência. A estrutura já está separada em camadas de núcleo, módulos e componentes compartilhados.

## Estrutura

- `lib/core/config/`: rotas e configuração
- `lib/core/network/`: cliente HTTP e interceptors
- `lib/core/services/`: serviços de API e armazenamento
- `lib/modules/auth/`: autenticação
- `lib/modules/alerts/`: alertas e dashboard
- `lib/modules/elderly/`: fluxo de emergência
- `lib/shared/models/`: modelos compartilhados
- `lib/shared/widgets/`: widgets reutilizáveis

## Tecnologias

- Flutter
- flutter_bloc
- Dio
- flutter_secure_storage

## Como executar

```powershell
cd apps/mobile
flutter pub get
flutter run
```

Para validação local:

```powershell
flutter test
flutter analyze
```

## Observações

- O arquivo `lib/main.dart` monta os repositórios, blocos e rotas principais da aplicação.
- A identidade visual usa uma paleta vermelha de marca e Material 3.
