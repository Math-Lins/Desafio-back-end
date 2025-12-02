import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';

import { Task } from './task.model';
import { Tag } from '../tags/tag.model';

@Table({
  tableName: 'task_tags',
  timestamps: false,
})
export class TaskTag extends Model<TaskTag> {
  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare taskId: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare tagId: number;
}
