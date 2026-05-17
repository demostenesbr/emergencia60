/**
 * WebSocket Events Specification
 *
 * Este arquivo documenta os eventos do WebSocket da API Emergência 60+
 * para referência estruturada. A documentação completa está em WEBSOCKET.md
 */

export interface WebSocketEventSpec {
  name: string;
  direction: 'client-to-server' | 'server-to-client' | 'bidirectional';
  description: string;
  payload?: any;
  response?: any;
  example?: {
    request?: string;
    response?: string;
  };
}

export const WEBSOCKET_EVENTS: WebSocketEventSpec[] = [
  {
    name: 'createWebsocket',
    direction: 'bidirectional',
    description: 'Cria um novo registro via WebSocket',
    payload: {
      type: 'object',
      example: {
        name: 'Nome do evento',
        description: 'Descrição opcional',
      },
    },
    response: {
      type: 'object',
      example: {
        id: 1,
        name: 'Nome do evento',
        description: 'Descrição opcional',
        createdAt: '2024-05-17T10:30:00Z',
        updatedAt: '2024-05-17T10:30:00Z',
      },
    },
    example: {
      request: `socket.emit('createWebsocket', { name: 'Novo Evento', description: 'Teste' });`,
      response: `socket.on('createWebsocket', (data) => { console.log('Criado:', data); });`,
    },
  },
  {
    name: 'findAllWebsocket',
    direction: 'bidirectional',
    description: 'Obtém todos os registros via WebSocket',
    payload: undefined,
    response: {
      type: 'array',
      example: [
        {
          id: 1,
          name: 'Evento 1',
          description: 'Descrição 1',
          createdAt: '2024-05-17T10:30:00Z',
          updatedAt: '2024-05-17T10:30:00Z',
        },
      ],
    },
    example: {
      request: `socket.emit('findAllWebsocket');`,
      response: `socket.on('findAllWebsocket', (data) => { console.log('Registros:', data); });`,
    },
  },
  {
    name: 'findOneWebsocket',
    direction: 'bidirectional',
    description: 'Obtém um registro específico pelo ID',
    payload: {
      type: 'number',
      example: 1,
      description: 'ID do registro a recuperar',
    },
    response: {
      type: 'object',
      example: {
        id: 1,
        name: 'Evento 1',
        description: 'Descrição 1',
        createdAt: '2024-05-17T10:30:00Z',
        updatedAt: '2024-05-17T10:30:00Z',
      },
    },
    example: {
      request: `socket.emit('findOneWebsocket', 1);`,
      response: `socket.on('findOneWebsocket', (data) => { console.log('Registro:', data); });`,
    },
  },
  {
    name: 'updateWebsocket',
    direction: 'bidirectional',
    description: 'Atualiza um registro existente (ID obrigatório)',
    payload: {
      type: 'object',
      example: {
        id: 1,
        name: 'Nome atualizado',
        description: 'Descrição atualizada',
      },
      required: ['id'],
    },
    response: {
      type: 'object',
      example: {
        id: 1,
        name: 'Nome atualizado',
        description: 'Descrição atualizada',
        createdAt: '2024-05-17T10:30:00Z',
        updatedAt: '2024-05-17T10:35:00Z',
      },
    },
    example: {
      request: `socket.emit('updateWebsocket', { id: 1, name: 'Atualizado' });`,
      response: `socket.on('updateWebsocket', (data) => { console.log('Atualizado:', data); });`,
    },
  },
  {
    name: 'removeWebsocket',
    direction: 'bidirectional',
    description: 'Remove um registro pelo ID',
    payload: {
      type: 'number',
      example: 1,
      description: 'ID do registro a remover',
    },
    response: {
      type: 'object',
      example: {
        id: 1,
        name: 'Evento 1',
        description: 'Descrição 1',
        createdAt: '2024-05-17T10:30:00Z',
        updatedAt: '2024-05-17T10:30:00Z',
      },
    },
    example: {
      request: `socket.emit('removeWebsocket', 1);`,
      response: `socket.on('removeWebsocket', (data) => { console.log('Removido:', data); });`,
    },
  },
];

/**
 * Metadados gerais do WebSocket
 */
export const WEBSOCKET_METADATA = {
  name: 'WebSocket API',
  version: '1.0.0',
  description: 'Comunicação em tempo real via Socket.IO',
  namespace: '/',
  connectionUrl: 'ws://localhost:3000/socket.io/',
  features: [
    'Comunicação bidirecional em tempo real',
    'Reconexão automática',
    'Suporte a Polling como fallback',
    'Eventos estruturados',
  ],
  documentation: './WEBSOCKET.md',
  tags: ['WebSocket', 'Real-time', 'Socket.IO'],
};
