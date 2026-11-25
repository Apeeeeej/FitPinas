import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from './user.entity.js';

@Entity('progress_records')
export class ProgressRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  recordedAt: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  weightKg: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  bodyFatPercent: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @ManyToOne(() => User, (user) => user.progressRecords, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
