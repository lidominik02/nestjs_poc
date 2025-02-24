import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma } from '@prisma/client';
import { TasksGateway } from './tasks.gateway';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tasksGateway: TasksGateway,
  ) {}

  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    await this.tasksGateway.sendTaskUpdate();
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Prisma.TaskUpdateInput,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
