import {  IsEnum,  IsInt,  IsNotEmpty,  IsOptional,  IsString,  Min,  IsArray,} from 'class-validator';
import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsInt()
  @Min(1)
  priority: number;

  // 🔥 Campo novo: lista de IDs de tags
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}
