import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { RecommendationService } from './services/recommendation.service';
import { HealthDataModule } from '../health-data/health-data.module';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workout.name, schema: WorkoutSchema },
      { name: User.name, schema: UserSchema },
    ]),
    HealthDataModule,
    UserModule,
    ConfigModule,
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, RecommendationService],
  exports: [WorkoutService, RecommendationService],
})
export class WorkoutModule {}
