import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { Exercise } from './entities/exercise.entity.js';
import { ProgressRecord } from './entities/progress-record.entity.js';
import { User } from './entities/user.entity.js';
import { WorkoutLog } from './entities/workout-log.entity.js';
import { WorkoutPlan } from './entities/workout-plan.entity.js';
import { ExercisesModule } from './exercises/exercises.module.js';
import { ProgressModule } from './progress/progress.module.js';
import { WorkoutLogsModule } from './workout-logs/workout-logs.module.js';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'fitpinas'),
        entities: [User, Exercise, WorkoutPlan, WorkoutLog, ProgressRecord],
        synchronize: config.get('NODE_ENV', 'development') !== 'production',
        retryAttempts: 1,
      }),
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'FitPinas',
    }),
    AuthModule,
    ExercisesModule,
    WorkoutPlansModule,
    WorkoutLogsModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
