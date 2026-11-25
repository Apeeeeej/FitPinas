import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity.js';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto.js';

@Injectable()
export class ExercisesService {
  constructor(@InjectRepository(Exercise) private readonly exercises: Repository<Exercise>) {}

  findAll() {
    return this.exercises.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const exercise = await this.exercises.findOne({ where: { id } });
    if (!exercise) throw new NotFoundException('Exercise not found');
    return exercise;
  }

  create(dto: CreateExerciseDto) {
    return this.exercises.save(
      this.exercises.create({
        name: dto.name,
        muscleGroup: dto.muscleGroup,
        description: dto.description ?? null,
        difficulty: dto.difficulty ?? 'beginner',
        equipment: dto.equipment ?? null,
      }),
    );
  }

  async update(id: number, dto: UpdateExerciseDto) {
    const exercise = await this.findOne(id);
    Object.assign(exercise, dto);
    return this.exercises.save(exercise);
  }

  async remove(id: number) {
    const exercise = await this.findOne(id);
    await this.exercises.remove(exercise);
    return { message: 'Exercise deleted successfully' };
  }
}
