import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Exercise } from './exercise.entity.js';
import { User } from './user.entity.js';

@Entity('workout_plans')
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  goal: string | null;

  @Column({ type: 'int', default: 4 })
  durationWeeks: number;

  @ManyToOne(() => User, (user) => user.workoutPlans, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @ManyToMany(() => Exercise, (exercise) => exercise.workoutPlans, { cascade: false })
  @JoinTable({ name: 'workout_plan_exercises' })
  exercises: Relation<Exercise[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
