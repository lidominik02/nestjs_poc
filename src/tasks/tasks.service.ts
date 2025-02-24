import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: Prisma.TaskUpdateInput) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
