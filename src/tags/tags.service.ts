import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Task } from '../tasks/task.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  // 🟦 Criar tag
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagModel.create(createTagDto as any);
  }

  // 🟧 Listar todas as tags
  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  // 🟩 Buscar tag por ID (inclui tasks associadas)
  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagModel.findByPk(id, {
      include: [Task], // 🔥 opcional
    });

    if (!tag) {
      throw new NotFoundException(`Tag com id ${id} não encontrada`);
    }

    return tag;
  }

  // 🟨 Atualizar tag
  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);

    await tag.update(updateTagDto);

    const updatedTag = await this.tagModel.findByPk(id, {
      include: [Task], // retorna já com tasks
    });

    if (!updatedTag) {
      throw new NotFoundException(`Tag com id ${id} não encontrada`);
    }

    return updatedTag;
  }

  // 🟥 Remover tag
  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await tag.destroy();
  }
}
