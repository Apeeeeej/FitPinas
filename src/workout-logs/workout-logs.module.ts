import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity.js';
import { WorkoutLog } from '../entities/workout-log.entity.js';
import { WorkoutPlan } from '../entities/workout-plan.entity.js';
import { WorkoutLogsController } from './workout-logs.controller.js';
import { WorkoutLogsService } from './workout-logs.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutLog, User, WorkoutPlan])],
  controllers: [WorkoutLogsController],
  providers: [WorkoutLogsService],
})
export class WorkoutLogsModule {}
