import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';

/**
 * WebSocket Gateway para comunicação em tempo real
 *
 * Este gateway implementa eventos Socket.IO para comunicação bidirecional em tempo real.
 * Todos os clientes conectados ao namespace padrão podem se inscrever nesses eventos.
 *
 * @example
 * // Conectar ao servidor WebSocket
 * const socket = io('http://localhost:3000');
 *
 * // Inscrever em um evento
 * socket.on('createWebsocket', (data) => {
 *   console.log('Novo websocket criado:', data);
 * });
 *
 * // Emitir um evento
 * socket.emit('createWebsocket', { name: 'Novo evento' });
 */
@WebSocketGateway()
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService) {}

  /**
   * Evento: createWebsocket
   * Cria um novo registro via WebSocket
   *
   * @param createWebsocketDto - Dados para criar o registro
   * @returns Retorna o registro criado
   *
   * @example
   * socket.emit('createWebsocket', { name: 'Novo evento' });
   * socket.on('createWebsocket', (data) => {
   *   console.log('Criado:', data);
   * });
   */
  @SubscribeMessage('createWebsocket')
  create(@MessageBody() createWebsocketDto: CreateWebsocketDto) {
    return this.websocketService.create(createWebsocketDto);
  }

  /**
   * Evento: findAllWebsocket
   * Obtém todos os registros via WebSocket
   *
   * @returns Lista de todos os registros
   *
   * @example
   * socket.emit('findAllWebsocket');
   * socket.on('findAllWebsocket', (data) => {
   *   console.log('Registros:', data);
   * });
   */
  @SubscribeMessage('findAllWebsocket')
  findAll() {
    return this.websocketService.findAll();
  }

  /**
   * Evento: findOneWebsocket
   * Obtém um registro específico via WebSocket
   *
   * @param id - ID do registro a ser recuperado
   * @returns Retorna o registro encontrado
   *
   * @example
   * socket.emit('findOneWebsocket', 1);
   * socket.on('findOneWebsocket', (data) => {
   *   console.log('Registro:', data);
   * });
   */
  @SubscribeMessage('findOneWebsocket')
  findOne(@MessageBody() id: number) {
    return this.websocketService.findOne(id);
  }

  /**
   * Evento: updateWebsocket
   * Atualiza um registro via WebSocket
   *
   * @param updateWebsocketDto - Dados para atualizar o registro (deve conter o ID)
   * @returns Retorna o registro atualizado
   *
   * @throws Error se o ID não estiver presente em updateWebsocketDto
   *
   * @example
   * socket.emit('updateWebsocket', { id: 1, name: 'Atualizado' });
   * socket.on('updateWebsocket', (data) => {
   *   console.log('Atualizado:', data);
   * });
   */
  @SubscribeMessage('updateWebsocket')
  update(@MessageBody() updateWebsocketDto: UpdateWebsocketDto) {
    const { id } = updateWebsocketDto;
    if (id === undefined || id === null) {
      throw new Error('updateWebsocketDto.id is required');
    }
    return this.websocketService.update(id, updateWebsocketDto);
  }

  /**
   * Evento: removeWebsocket
   * Remove um registro via WebSocket
   *
   * @param id - ID do registro a ser removido
   * @returns Retorna o registro removido
   *
   * @example
   * socket.emit('removeWebsocket', 1);
   * socket.on('removeWebsocket', (data) => {
   *   console.log('Removido:', data);
   * });
   */
  @SubscribeMessage('removeWebsocket')
  remove(@MessageBody() id: number) {
    return this.websocketService.remove(id);
  }
}
