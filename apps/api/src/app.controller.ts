import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('send')
  sendMessage() {
    this.rabbitMQService.sendMessage('Hello from NestJS!');
    return { message: 'Message sent to RabbitMQ' };
  }

  @Get('consume')
  async consumeMessages() {
    await this.rabbitMQService.consumeMessages();
    return { message: 'Started consuming messages' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
