import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Workout, WorkoutDocument } from '../schemas/workout.schema';
import { UserDocument } from '../../user/schemas/user.schema';
import { HealthDataService } from '../../health-data/health-data.service';
export declare class RecommendationService {
    private workoutModel;
    private userModel;
    private healthDataService;
    private configService;
    private genAI;
    private model;
    constructor(workoutModel: Model<WorkoutDocument>, userModel: Model<UserDocument>, healthDataService: HealthDataService, configService: ConfigService);
    getRecommendations(userId: string): Promise<Workout[]>;
    private parseGeminiResponse;
    private calculateAverage;
    private getDefaultRecommendations;
    seedDefaultWorkouts(): Promise<void>;
}
