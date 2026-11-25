import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from './user.entity.js';
import { WorkoutPlan } from './workout-plan.entity.js';

@Entity('workout_logs')
export class WorkoutLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  workoutDate: string;

  @Column({ type: 'int', default: 0 })
  durationMinutes: number;

  @Column({ type: 'int', default: 0 })
  caloriesBurned: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @ManyToOne(() => User, (user) => user.workoutLogs, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @ManyToOne(() => WorkoutPlan, { nullable: true, onDelete: 'SET NULL' })
  workoutPlan: Relation<WorkoutPlan | null>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
