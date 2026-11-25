import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CreateWorkoutLogDto, UpdateWorkoutLogDto } from './dto/workout-log.dto.js';
import { WorkoutLogsService } from './workout-logs.service.js';

@UseGuards(JwtAuthGuard)
@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private readonly logsService: WorkoutLogsService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.logsService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number) {
    return this.logsService.findOne(user.sub, id);
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateWorkoutLogDto) {
    return this.logsService.create(user.sub, dto);
  }

  @Patch(':id')
  update(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWorkoutLogDto) {
    return this.logsService.update(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number) {
    return this.logsService.remove(user.sub, id);
  }
}
