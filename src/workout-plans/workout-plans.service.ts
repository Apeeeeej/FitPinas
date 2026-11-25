import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity.js';
import { User } from '../entities/user.entity.js';
import { WorkoutPlan } from '../entities/workout-plan.entity.js';
import { AddExerciseToPlanDto, CreateWorkoutPlanDto, UpdateWorkoutPlanDto } from './dto/workout-plan.dto.js';

@Injectable()
export class WorkoutPlansService {
  constructor(
    @InjectRepository(WorkoutPlan) private readonly plans: Repository<WorkoutPlan>,
    @InjectRepository(Exercise) private readonly exercises: Repository<Exercise>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findAll(userId: number) {
    return this.plans.find({ where: { user: { id: userId } }, relations: { exercises: true }, order: { createdAt: 'DESC' } });
  }

  async findOne(userId: number, id: number) {
    const plan = await this.plans.findOne({ where: { id, user: { id: userId } }, relations: { exercises: true } });
    if (!plan) throw new NotFoundException('Workout plan not found');
    return plan;
  }

  async create(userId: number, dto: CreateWorkoutPlanDto) {
    const user = await this.users.findOneByOrFail({ id: userId });
    const exercises = dto.exerciseIds?.length ? await this.exercises.findBy({ id: In(dto.exerciseIds) }) : [];
    const plan = this.plans.create({
      name: dto.name,
      description: dto.description ?? null,
      goal: dto.goal ?? null,
      durationWeeks: dto.durationWeeks ?? 4,
      user,
      exercises,
    });
    return this.plans.save(plan);
  }

  async update(userId: number, id: number, dto: UpdateWorkoutPlanDto) {
    const plan = await this.findOne(userId, id);
    Object.assign(plan, dto);
    return this.plans.save(plan);
  }

  async remove(userId: number, id: number) {
    const plan = await this.findOne(userId, id);
    await this.plans.remove(plan);
    return { message: 'Workout plan deleted successfully' };
  }

  async addExercise(userId: number, id: number, dto: AddExerciseToPlanDto) {
    const plan = await this.findOne(userId, id);
    const exercise = await this.exercises.findOne({ where: { id: dto.exerciseId } });
    if (!exercise) throw new NotFoundException('Exercise not found');
    if (!plan.exercises.some((item) => item.id === exercise.id)) plan.exercises.push(exercise);
    return this.plans.save(plan);
  }

  async removeExercise(userId: number, id: number, exerciseId: number) {
    const plan = await this.findOne(userId, id);
    plan.exercises = plan.exercises.filter((exercise) => exercise.id !== exerciseId);
    return this.plans.save(plan);
  }
}
