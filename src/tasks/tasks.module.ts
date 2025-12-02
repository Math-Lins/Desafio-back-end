import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

import { Task } from './task.model';
import { Tag } from '../tags/tag.model';
import { TaskTag } from './task-tag.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, Tag, TaskTag]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
