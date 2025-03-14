import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { RecommendationService } from './services/recommendation.service';
import { Workout } from './schemas/workout.schema';

@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly recommendationService: RecommendationService,
  ) {}

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @Post()
  create(@Body() workout: Workout & { userId: string }) {
    return this.workoutService.create(workout);
  }

  @Get('/user/:userId')
  getRecommendations(@Param('userId') userId: string) {
    return this.recommendationService.getRecommendations(userId);
  }

  @Get('filter')
  filter(
    @Query('type') type: string,
    @Query('difficulty') difficulty: string,
    @Query('duration') duration: number,
  ) {
    return this.workoutService.filter(type, difficulty, duration);
  }
}
