import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TasksService } from './tasks.service';

@WebSocketGateway({ cors: true })
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private tasksService: TasksService) {}

  async sendTaskUpdate() {
    const tasks = await this.tasksService.findAll();
    this.server.emit('tasksUpdated', tasks);
  }
}
