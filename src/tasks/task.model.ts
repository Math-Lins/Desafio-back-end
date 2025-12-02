import {  Table,  Column,  Model,  DataType,  PrimaryKey,  AutoIncrement,  BelongsToMany,} from 'sequelize-typescript';

import { Tag } from '../tags/tag.model';
import { TaskTag } from './task-tag.model';

export enum TaskStatus {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADO = 'FINALIZADO',
}

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model<Task> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    allowNull: false,
    defaultValue: TaskStatus.EM_ANDAMENTO,
  })
  status: TaskStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  priority: number;

  // 🔥 RELACIONAMENTO MANY-TO-MANY COM TAGS
  @BelongsToMany(() => Tag, () => TaskTag)
  declare tags?: Tag[];
}
