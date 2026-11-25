import { IsDateString, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkoutLogDto {
  @IsDateString()
  workoutDate: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1440)
  durationMinutes: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  caloriesBurned?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  workoutPlanId?: number;
}

export class UpdateWorkoutLogDto {
  @IsOptional()
  @IsDateString()
  workoutDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1440)
  durationMinutes?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  caloriesBurned?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  workoutPlanId?: number;
}
