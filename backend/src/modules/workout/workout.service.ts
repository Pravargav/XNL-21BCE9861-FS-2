import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkoutDto } from './dto/workout.dto';
import { RecommendationService } from './services/recommendation.service';

@Injectable()
export class WorkoutService implements OnModuleInit {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
    private recommendationService: RecommendationService,
  ) {}

  async onModuleInit() {
    await this.recommendationService.seedDefaultWorkouts();
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const createdWorkout = new this.workoutModel(createWorkoutDto);
    return createdWorkout.save();
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutModel.find().exec();
  }

  async findOne(id: string): Promise<Workout> {
    return this.workoutModel.findById(id).exec();
  }

  async update(id: string, updateWorkoutDto: any): Promise<Workout> {
    return this.workoutModel
      .findByIdAndUpdate(id, updateWorkoutDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Workout> {
    return this.workoutModel.findByIdAndDelete(id).exec();
  }

  async filter(type?: string, difficulty?: string, duration?: number): Promise<Workout[]> {
    const query: any = {};
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (duration) query.duration = { $lte: duration };
    return this.workoutModel.find(query).exec();
  }

  async findRecommended(): Promise<Workout[]> {
    return this.workoutModel.find({ isRecommended: true }).limit(5).exec();
  }
  
  async findByTypes(types: string[]): Promise<Workout[]> {
    return this.workoutModel.find({ type: { $in: types } }).exec();
  }
  
  async findByDifficulty(difficulty: string): Promise<Workout[]> {
    return this.workoutModel.find({ difficulty }).exec();
  }
  
  async findByEquipment(equipment: string[]): Promise<Workout[]> {
    return this.workoutModel.find({ equipment: { $in: equipment } }).exec();
  }
  
  async findByTargetMuscles(muscles: string[]): Promise<Workout[]> {
    return this.workoutModel.find({ targetMuscles: { $in: muscles } }).exec();
  }
  
  async findSimilar(workoutId: string): Promise<Workout[]> {
    const workout = await this.workoutModel.findById(workoutId).exec();
    if (!workout) return [];
    
    return this.workoutModel
      .find({
        _id: { $ne: workoutId },
        $or: [
          { type: workout.type },
          { difficulty: workout.difficulty },
          { targetMuscles: { $in: workout.targetMuscles } },
        ],
      })
      .limit(4)
      .exec();
  }
} 