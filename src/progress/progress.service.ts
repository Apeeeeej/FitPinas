import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressRecord } from '../entities/progress-record.entity.js';
import { User } from '../entities/user.entity.js';
import { CreateProgressDto, UpdateProgressDto } from './dto/progress.dto.js';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(ProgressRecord) private readonly records: Repository<ProgressRecord>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findAll(userId: number) {
    return this.records.find({ where: { user: { id: userId } }, order: { recordedAt: 'DESC' } });
  }

  async findOne(userId: number, id: number) {
    const record = await this.records.findOne({ where: { id, user: { id: userId } } });
    if (!record) throw new NotFoundException('Progress record not found');
    return record;
  }

  async create(userId: number, dto: CreateProgressDto) {
    const user = await this.users.findOneByOrFail({ id: userId });
    return this.records.save(
      this.records.create({
        recordedAt: dto.recordedAt,
        weightKg: dto.weightKg,
        bodyFatPercent: dto.bodyFatPercent ?? null,
        notes: dto.notes ?? null,
        user,
      }),
    );
  }

  async update(userId: number, id: number, dto: UpdateProgressDto) {
    const record = await this.findOne(userId, id);
    Object.assign(record, dto);
    return this.records.save(record);
  }

  async remove(userId: number, id: number) {
    const record = await this.findOne(userId, id);
    await this.records.remove(record);
    return { message: 'Progress record deleted successfully' };
  }
}
