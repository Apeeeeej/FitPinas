import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { ProgressRecord } from './progress-record.entity.js';
import { WorkoutLog } from './workout-log.entity.js';
import { WorkoutPlan } from './workout-plan.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  fullName: string;

  @Column({ unique: true, length: 160 })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user', length: 30 })
  role: string;

  @OneToMany(() => WorkoutPlan, (plan) => plan.user)
  workoutPlans: Relation<WorkoutPlan[]>;

  @OneToMany(() => WorkoutLog, (log) => log.user)
  workoutLogs: Relation<WorkoutLog[]>;

  @OneToMany(() => ProgressRecord, (record) => record.user)
  progressRecords: Relation<ProgressRecord[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
