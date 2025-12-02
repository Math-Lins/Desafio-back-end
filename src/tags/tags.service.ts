import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = await this.tagModel.create(
      createTagDto as any,
    );

    return tag;
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagModel.findByPk(id);

    if (!tag) {
      throw new NotFoundException(`Tag com id ${id} não encontrada`);
    }

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);

    await tag.update(updateTagDto);

    return tag;
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await tag.destroy();
  }
}
