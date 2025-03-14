import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workout.schema';
import { CreateWorkoutDto } from './dto/workout.dto';
import { RecommendationService } from './services/recommendation.service';
export declare class WorkoutService implements OnModuleInit {
    private workoutModel;
    private recommendationService;
    constructor(workoutModel: Model<WorkoutDocument>, recommendationService: RecommendationService);
    onModuleInit(): Promise<void>;
    create(createWorkoutDto: CreateWorkoutDto): Promise<Workout>;
    findAll(): Promise<Workout[]>;
    findOne(id: string): Promise<Workout>;
    update(id: string, updateWorkoutDto: any): Promise<Workout>;
    remove(id: string): Promise<Workout>;
    filter(type?: string, difficulty?: string, duration?: number): Promise<Workout[]>;
    findRecommended(): Promise<Workout[]>;
    findByTypes(types: string[]): Promise<Workout[]>;
    findByDifficulty(difficulty: string): Promise<Workout[]>;
    findByEquipment(equipment: string[]): Promise<Workout[]>;
    findByTargetMuscles(muscles: string[]): Promise<Workout[]>;
    findSimilar(workoutId: string): Promise<Workout[]>;
}
