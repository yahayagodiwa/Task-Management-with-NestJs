import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  getTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getTaskById(userId: string, taskId: string) {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });
  }

  async createTask(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  async editTask(userId: string, taskId: string, dto: EditTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        ...dto,
      },
    });
  }

  async deleteTask(userId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return { message: 'Task deleted' };
  }
}
