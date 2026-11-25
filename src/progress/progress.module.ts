import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressRecord } from '../entities/progress-record.entity.js';
import { User } from '../entities/user.entity.js';
import { ProgressController } from './progress.controller.js';
import { ProgressService } from './progress.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressRecord, User])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
