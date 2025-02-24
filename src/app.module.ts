import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [TasksModule, PrismaModule, RabbitMQModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
