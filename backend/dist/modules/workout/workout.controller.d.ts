import { WorkoutService } from './workout.service';
import { RecommendationService } from './services/recommendation.service';
import { Workout } from './schemas/workout.schema';
export declare class WorkoutController {
    private readonly workoutService;
    private readonly recommendationService;
    constructor(workoutService: WorkoutService, recommendationService: RecommendationService);
    findAll(): Promise<Workout[]>;
    findOne(id: string): Promise<Workout>;
    create(workout: Workout & {
        userId: string;
    }): Promise<Workout>;
    getRecommendations(userId: string): Promise<Workout[]>;
    filter(type: string, difficulty: string, duration: number): Promise<Workout[]>;
}
