import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetTasksDto } from './dto/get-tasks.dto';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@GetUser('sub') userId: string, @Query() filters: GetTasksDto) {
    return this.tasksService.getTasks(userId, filters);
  }

  @Get(':id')
  getTaskById(@GetUser('sub') userId: string, @Param('id') taskId: string) {
    return this.tasksService.getTaskById(userId, taskId);
  }

  @Post()
  createTask(@GetUser('sub') userId: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(userId, dto);
  }

  @Patch(':id')
  editTask(
    @GetUser('sub') userId: string,
    @Param('id') taskId: string,
    @Body() dto: EditTaskDto,
  ) {
    return this.tasksService.editTask(userId, taskId, dto);
  }

  @Delete(':id')
  deleteTask(@GetUser('sub') userId: string, @Param('id') taskId: string) {
    return this.tasksService.deleteTask(userId, taskId);
  }
}
