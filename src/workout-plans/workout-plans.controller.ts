import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { AddExerciseToPlanDto, CreateWorkoutPlanDto, UpdateWorkoutPlanDto } from './dto/workout-plan.dto.js';
import { WorkoutPlansService } from './workout-plans.service.js';

@UseGuards(JwtAuthGuard)
@Controller('workout-plans')
export class WorkoutPlansController {
  constructor(private readonly plansService: WorkoutPlansService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.plansService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number) {
    return this.plansService.findOne(user.sub, id);
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateWorkoutPlanDto) {
    return this.plansService.create(user.sub, dto);
  }

  @Patch(':id')
  update(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWorkoutPlanDto) {
    return this.plansService.update(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number) {
    return this.plansService.remove(user.sub, id);
  }

  @Post(':id/exercises')
  addExercise(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number, @Body() dto: AddExerciseToPlanDto) {
    return this.plansService.addExercise(user.sub, id, dto);
  }

  @Delete(':id/exercises/:exerciseId')
  removeExercise(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseIntPipe) id: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ) {
    return this.plansService.removeExercise(user.sub, id, exerciseId);
  }
}
