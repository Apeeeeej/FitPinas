import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { WorkoutLog } from '../entities/workout-log.entity.js';
import { WorkoutPlan } from '../entities/workout-plan.entity.js';
import { CreateWorkoutLogDto, UpdateWorkoutLogDto } from './dto/workout-log.dto.js';

@Injectable()
export class WorkoutLogsService {
  constructor(
    @InjectRepository(WorkoutLog) private readonly logs: Repository<WorkoutLog>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(WorkoutPlan) private readonly plans: Repository<WorkoutPlan>,
  ) {}

  findAll(userId: number) {
    return this.logs.find({ where: { user: { id: userId } }, relations: { workoutPlan: true }, order: { workoutDate: 'DESC' } });
  }

  async findOne(userId: number, id: number) {
    const log = await this.logs.findOne({ where: { id, user: { id: userId } }, relations: { workoutPlan: true } });
    if (!log) throw new NotFoundException('Workout log not found');
    return log;
  }

  async create(userId: number, dto: CreateWorkoutLogDto) {
    const user = await this.users.findOneByOrFail({ id: userId });
    const workoutPlan = dto.workoutPlanId ? await this.getPlan(userId, dto.workoutPlanId) : null;
    return this.logs.save(
      this.logs.create({
        workoutDate: dto.workoutDate,
        durationMinutes: dto.durationMinutes,
        caloriesBurned: dto.caloriesBurned ?? 0,
        notes: dto.notes ?? null,
        user,
        workoutPlan,
      }),
    );
  }

  async update(userId: number, id: number, dto: UpdateWorkoutLogDto) {
    const log = await this.findOne(userId, id);
    const { workoutPlanId, ...changes } = dto;
    Object.assign(log, changes);
    if (workoutPlanId !== undefined) log.workoutPlan = await this.getPlan(userId, workoutPlanId);
    return this.logs.save(log);
  }

  async remove(userId: number, id: number) {
    const log = await this.findOne(userId, id);
    await this.logs.remove(log);
    return { message: 'Workout log deleted successfully' };
  }

  private async getPlan(userId: number, id: number) {
    const plan = await this.plans.findOne({ where: { id, user: { id: userId } } });
    if (!plan) throw new NotFoundException('Workout plan not found');
    return plan;
  }
}
