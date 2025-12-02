import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tag } from '../tags/tag.model';
import { Op } from 'sequelize';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  // 🟦 Cria uma task com tagIds
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { tagIds, ...data } = createTaskDto;

    const task = await this.taskModel.create(data as any);

    // se tiver tags vinculadas
    if (tagIds && tagIds.length > 0) {
      await task.$set('tags', tagIds);
    }

    const createdTask = await this.taskModel.findByPk(task.id, {
      include: [Tag],
    });

    if (!createdTask) {
      throw new NotFoundException(`Task com id ${task.id} não encontrada após criação`);
    }

    return createdTask;
  }

  // 🟪 Lista tasks e aceita filtro por tags
  async findAll(tags?: string[]): Promise<Task[]> {
    const include: any[] = [{ model: Tag }];

    // se tiver filtro de tags na URL
    if (tags && tags.length > 0) {
      include[0].where = {
        name: { [Op.in]: tags },
      };
      include[0].required = true;
    }

    return this.taskModel.findAll({
      include,
      subQuery: false,
    });
  }

  // 🟧 Busca task por ID incluindo tags
  async findOne(id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id, {
      include: [Tag],
    });

    if (!task) {
      throw new NotFoundException(`Task com id ${id} não encontrada`);
    }

    return task;
  }

  // 🟩 Atualiza task e substitui tags se enviadas
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { tagIds, ...data } = updateTaskDto;

    const task = await this.findOne(id);

    await task.update(data);

    if (tagIds) {
      await task.$set('tags', tagIds);
    }

    const updatedTask = await this.taskModel.findByPk(task.id, {
      include: [Tag],
    });

    if (!updatedTask) {
      throw new NotFoundException(`Task com id ${id} não encontrada após atualização`);
    }

    return updatedTask;
  }

  // 🟥 Remove task
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await task.destroy();
  }
}
