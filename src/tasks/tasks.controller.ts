import {  Body,  Controller,  Delete,  Get,  Param,  Patch,  Post,  Query,} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // 🔥 Agora aceita filtro por tags via query param
  // GET /tasks
  // GET /tasks?tags=Estudo,Matemática,Física
  @Get()
  findAll(@Query('tags') tags?: string) {
    const tagNames = tags ? tags.split(',') : undefined;
    return this.tasksService.findAll(tagNames);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
