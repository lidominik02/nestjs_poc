import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'example_queue';

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    this.connection = await amqp.connect(
      `amqp://${this.configService.get<string>('RABBITMQ_HOST')}:${this.configService.get<string>('RABBITMQ_PORT')}`,
    );
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
    console.log('Connected to RabbitMQ');
  }

  sendMessage(message: string) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }
    this.channel.sendToQueue(this.queue, Buffer.from(message));
    console.log(`Sent: ${message}`);
  }

  async consumeMessages() {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }
    await this.channel.consume(this.queue, (msg) => {
      if (msg) {
        console.log(`Received: ${msg.content.toString()}`);
        this.channel.ack(msg);
      }
    });
  }

  private async disconnect() {
    await this.channel?.close();
    await this.connection?.close();
    console.log('Disconnected from RabbitMQ');
  }
}
