import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';

import { Task } from '../tasks/task.model';
import { TaskTag } from '../tasks/task-tag.model';

@Table({
  tableName: 'tags',
  timestamps: true,
})
export class Tag extends Model<Tag> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  // 🔥 RELACIONAMENTO MANY-TO-MANY COM TASKS
  @BelongsToMany(() => Task, () => TaskTag)
  declare tasks?: Task[];
}
