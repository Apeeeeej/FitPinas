import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity.js';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ length: 80 })
  muscleGroup: string;

  @Column({ length: 30, default: 'beginner' })
  difficulty: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  equipment: string | null;

  @ManyToMany(() => WorkoutPlan, (plan) => plan.exercises)
  workoutPlans: Relation<WorkoutPlan[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
