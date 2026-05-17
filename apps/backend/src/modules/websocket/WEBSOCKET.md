# WebSocket API Documentation

## Overview

O módulo WebSocket do Emergência 60+ fornece comunicação em tempo real via Socket.IO. Os clientes podem se conectar ao servidor WebSocket e se inscrever em eventos para receber atualizações em tempo real.

## Conexão

### URL de Conexão
```
ws://localhost:3000/socket.io/
http://localhost:3000/socket.io/ (fallback com polling)
```

### Exemplo de Conexão (JavaScript/Node.js)
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('Conectado ao servidor WebSocket');
});

socket.on('disconnect', () => {
  console.log('Desconectado do servidor WebSocket');
});

socket.on('error', (error) => {
  console.error('Erro WebSocket:', error);
});
```

## Eventos WebSocket

### 1. **createWebsocket**

Cria um novo registro via WebSocket.

#### Emitir (Client → Server)
```javascript
socket.emit('createWebsocket', {
  name: 'Nome do evento',
  description: 'Descrição opcional',
  // ... outros campos necessários
});
```

#### Receber (Server → Client)
```javascript
socket.on('createWebsocket', (data) => {
  console.log('Novo registro criado:', data);
  // data contém o registro criado com ID gerado
});
```

#### Resposta Esperada
```json
{
  "id": 1,
  "name": "Nome do evento",
  "description": "Descrição opcional",
  "createdAt": "2024-05-17T10:30:00Z",
  "updatedAt": "2024-05-17T10:30:00Z"
}
```

---

### 2. **findAllWebsocket**

Obtém todos os registros armazenados no sistema.

#### Emitir (Client → Server)
```javascript
socket.emit('findAllWebsocket');
```

#### Receber (Server → Client)
```javascript
socket.on('findAllWebsocket', (data) => {
  console.log('Todos os registros:', data);
});
```

#### Resposta Esperada
```json
[
  {
    "id": 1,
    "name": "Evento 1",
    "description": "Descrição 1",
    "createdAt": "2024-05-17T10:30:00Z",
    "updatedAt": "2024-05-17T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Evento 2",
    "description": "Descrição 2",
    "createdAt": "2024-05-17T10:31:00Z",
    "updatedAt": "2024-05-17T10:31:00Z"
  }
]
```

---

### 3. **findOneWebsocket**

Obtém um registro específico pelo ID.

#### Emitir (Client → Server)
```javascript
socket.emit('findOneWebsocket', 1); // ID do registro
```

#### Receber (Server → Client)
```javascript
socket.on('findOneWebsocket', (data) => {
  console.log('Registro encontrado:', data);
});
```

#### Resposta Esperada
```json
{
  "id": 1,
  "name": "Evento 1",
  "description": "Descrição 1",
  "createdAt": "2024-05-17T10:30:00Z",
  "updatedAt": "2024-05-17T10:30:00Z"
}
```

---

### 4. **updateWebsocket**

Atualiza um registro existente. O ID é obrigatório no objeto de dados.

#### Emitir (Client → Server)
```javascript
socket.emit('updateWebsocket', {
  id: 1, // ID obrigatório
  name: 'Nome atualizado',
  description: 'Descrição atualizada'
});
```

#### Receber (Server → Client)
```javascript
socket.on('updateWebsocket', (data) => {
  console.log('Registro atualizado:', data);
});
```

#### Resposta Esperada
```json
{
  "id": 1,
  "name": "Nome atualizado",
  "description": "Descrição atualizada",
  "createdAt": "2024-05-17T10:30:00Z",
  "updatedAt": "2024-05-17T10:35:00Z"
}
```

#### Erros
- Se `id` não for fornecido, o servidor retorna um erro: `"updateWebsocketDto.id is required"`

---

### 5. **removeWebsocket**

Remove um registro pelo ID.

#### Emitir (Client → Server)
```javascript
socket.emit('removeWebsocket', 1); // ID do registro
```

#### Receber (Server → Client)
```javascript
socket.on('removeWebsocket', (data) => {
  console.log('Registro removido:', data);
});
```

#### Resposta Esperada
```json
{
  "id": 1,
  "name": "Evento 1",
  "description": "Descrição 1",
  "createdAt": "2024-05-17T10:30:00Z",
  "updatedAt": "2024-05-17T10:30:00Z"
}
```

---

## Exemplo Completo de Cliente

```javascript
import { io } from 'socket.io-client';

class WebSocketClient {
  constructor(url = 'http://localhost:3000') {
    this.socket = io(url);
    this.setupListeners();
  }

  setupListeners() {
    this.socket.on('connect', () => {
      console.log('✓ Conectado ao servidor');
    });

    this.socket.on('disconnect', () => {
      console.log('✗ Desconectado do servidor');
    });

    // Configurar listeners para cada evento
    ['createWebsocket', 'findAllWebsocket', 'findOneWebsocket', 'updateWebsocket', 'removeWebsocket'].forEach(event => {
      this.socket.on(event, (data) => {
        console.log(`Evento ${event}:`, data);
      });
    });
  }

  create(data) {
    this.socket.emit('createWebsocket', data);
  }

  findAll() {
    this.socket.emit('findAllWebsocket');
  }

  findOne(id) {
    this.socket.emit('findOneWebsocket', id);
  }

  update(data) {
    this.socket.emit('updateWebsocket', data);
  }

  remove(id) {
    this.socket.emit('removeWebsocket', id);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

// Uso
const client = new WebSocketClient();

// Criar um novo registro
setTimeout(() => {
  client.create({ name: 'Novo Evento', description: 'Teste' });
}, 1000);

// Listar todos
setTimeout(() => {
  client.findAll();
}, 2000);

// Obter um específico
setTimeout(() => {
  client.findOne(1);
}, 3000);

// Atualizar
setTimeout(() => {
  client.update({ id: 1, name: 'Atualizado' });
}, 4000);

// Remover
setTimeout(() => {
  client.remove(1);
}, 5000);
```

---

## Tratamento de Erros

Todos os erros no WebSocket são retornados via eventos de erro padrão do Socket.IO:

```javascript
socket.on('error', (error) => {
  console.error('Erro geral:', error);
});

// Para erros específicos de um evento, capture com try-catch na callback
socket.on('updateWebsocket', (data, callback) => {
  try {
    // Processar dados
  } catch (error) {
    console.error('Erro ao processar:', error);
  }
});
```

---

## Boas Práticas

1. **Reconexão Automática**: Configure o socket com `reconnection: true` para reconectações automáticas
2. **Listeners Únicos**: Use `socket.once()` para listeners que devem disparar apenas uma vez
3. **Cleanup**: Sempre desconecte quando terminar: `socket.disconnect()`
4. **Validação**: Sempre valide os dados antes de enviar para o servidor
5. **Tratamento de Erros**: Implemente tratamento de erros robusto para conexões instáveis

---

## Recursos Relacionados

- [Socket.IO Documentation](https://socket.io/docs/)
- [NestJS WebSockets Documentation](https://docs.nestjs.com/websockets/gateways)
- [REST API Documentation](./../../docs) (veja Swagger em `/api/v1/docs`)
