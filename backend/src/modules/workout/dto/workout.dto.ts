export class CreateWorkoutDto {
  name: string;
  description: string;
  duration: number;
  calories: number;
  difficulty: string;
  type: string;
  targetMuscles?: string[];
  equipment?: string[];
  imageUrl?: string;
  userId: string; // Added userId to associate workouts with a user
}
