import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity.js';
import { User } from '../entities/user.entity.js';
import { WorkoutPlan } from '../entities/workout-plan.entity.js';
import { WorkoutPlansController } from './workout-plans.controller.js';
import { WorkoutPlansService } from './workout-plans.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan, Exercise, User])],
  controllers: [WorkoutPlansController],
  providers: [WorkoutPlansService],
})
export class WorkoutPlansModule {}
