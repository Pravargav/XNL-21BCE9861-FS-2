import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Workout, WorkoutDocument } from '../schemas/workout.schema';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { HealthDataService } from '../../health-data/health-data.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class RecommendationService {
  private genAI: any;
  private model: any;

  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private healthDataService: HealthDataService,
    private configService: ConfigService,
  ) {
    // Initialize Gemini API
    const apiKey = this.configService.get<string>('gemini.apiKey');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  async getRecommendations(userId: string): Promise<Workout[]> {
    // If Gemini API is not configured, return default recommendations
    if (!this.genAI) {
      return this.getDefaultRecommendations();
    }

    try {
      // Get user profile
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        return this.getDefaultRecommendations();
      }

      // Get user's health data for the past week
      const healthData = await this.healthDataService.findWeeklySummary(userId);

      // Process user data for model input
      const userContext = {
        age: user.age,
        weight: user.weight,
        height: user.height,
        fitnessLevel: user.fitnessLevel,
        fitnessGoal: user.fitnessGoal,
        avgSteps: this.calculateAverage(healthData, 'steps'),
        avgActiveMinutes: this.calculateAverage(healthData, 'activeMinutes'),
        avgHeartRate: this.calculateAverage(healthData, 'avgHeartRate'),
        avgCalories: this.calculateAverage(healthData, 'calories'),
      };

      // Get all available workouts from database
      const allWorkouts = await this.workoutModel.find().exec();
      
      // Format workouts for passing to Gemini
      const formattedWorkouts = allWorkouts.map(workout => ({
        id: workout._id.toString(),
        name: workout.name,
        type: workout.type,
        difficulty: workout.difficulty,
        duration: workout.duration,
        calories: workout.calories,
        targetMuscles: workout.targetMuscles,
      }));

      // Generate prompt for Gemini
      const prompt = `
      Based on the following user health profile and fitness data, recommend 3-5 most suitable workouts.
      
      User Profile:
      - Age: ${userContext.age || 'Unknown'}
      - Weight: ${userContext.weight || 'Unknown'} kg
      - Height: ${userContext.height || 'Unknown'} cm
      - Fitness Level: ${userContext.fitnessLevel || 'beginner'}
      - Fitness Goal: ${userContext.fitnessGoal || 'weight_loss'}
      
      Recent Activity (7-day averages):
      - Average Daily Steps: ${userContext.avgSteps || 0}
      - Average Active Minutes: ${userContext.avgActiveMinutes || 0}
      - Average Heart Rate: ${userContext.avgHeartRate || 0} bpm
      - Average Calories Burned: ${userContext.avgCalories || 0}
      
      Available Workouts (format: id, name, type, difficulty, duration in minutes, calories burned):
      ${JSON.stringify(formattedWorkouts)}
      
      Please respond with only a JSON array of workout IDs that are best for this user. Format: ["id1", "id2", "id3", "id4", "id5"]. Select 3-5 workouts.`;

      // Get recommendations from Gemini
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      // Parse the response to get workout IDs
      const workoutIds = this.parseGeminiResponse(responseText);
      
      if (workoutIds.length > 0) {
        // Fetch full workout details from database
        return this.workoutModel.find({ _id: { $in: workoutIds } }).exec();
      } else {
        return this.getDefaultRecommendations();
      }
    } catch (error) {
      console.error('Error generating workout recommendations:', error);
      return this.getDefaultRecommendations();
    }
  }

  private parseGeminiResponse(response: string): string[] {
    try {
      // Find JSON array in the response
      const match = response.match(/\[.*?\]/s);
      if (match) {
        const jsonStr = match[0];
        const workoutIds = JSON.parse(jsonStr);
        return Array.isArray(workoutIds) ? workoutIds : [];
      }
      return [];
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return [];
    }
  }

  private calculateAverage(data: any[], field: string): number {
    if (!data || data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0);
    return Math.round(sum / data.length);
  }

  private async getDefaultRecommendations(): Promise<Workout[]> {
    // Return a selection of default workouts for different categories
    const beginner = await this.workoutModel.findOne({ difficulty: 'beginner' }).exec();
    const cardio = await this.workoutModel.findOne({ type: 'cardio' }).exec();
    const strength = await this.workoutModel.findOne({ type: 'strength' }).exec();
    const flexibility = await this.workoutModel.findOne({ type: 'flexibility' }).exec();
    
    return [beginner, cardio, strength, flexibility].filter(Boolean);
  }
  
  // Method to seed default workouts if none exist
  async seedDefaultWorkouts(): Promise<void> {
    const count = await this.workoutModel.countDocuments();
    if (count === 0) {
      const defaultWorkouts = [
        {
          name: 'Morning Yoga Flow',
          description: 'Start your day with energizing yoga poses to improve flexibility and mental clarity.',
          duration: 20,
          calories: 150,
          difficulty: 'beginner',
          type: 'flexibility',
          targetMuscles: ['core', 'back', 'hamstrings'],
          equipment: ['yoga mat'],
          imageUrl: '/images/yoga-flow.jpg',
        },
        {
          name: 'HIIT Cardio Blast',
          description: 'High intensity interval training to maximize calorie burn in a short amount of time.',
          duration: 30,
          calories: 350,
          difficulty: 'intermediate',
          type: 'cardio',
          targetMuscles: ['full body'],
          equipment: ['none'],
          imageUrl: '/images/hiit-cardio.jpg',
        },
        {
          name: 'Full Body Strength',
          description: 'Complete strength training routine targeting all major muscle groups.',
          duration: 45,
          calories: 300,
          difficulty: 'intermediate',
          type: 'strength',
          targetMuscles: ['chest', 'back', 'legs', 'arms', 'shoulders'],
          equipment: ['dumbbells', 'bench'],
          imageUrl: '/images/strength-training.jpg',
        },
        {
          name: 'Beginner Walking',
          description: 'Simple walking routine ideal for beginners or recovery days.',
          duration: 20,
          calories: 120,
          difficulty: 'beginner',
          type: 'cardio',
          targetMuscles: ['legs'],
          equipment: ['none'],
          imageUrl: '/images/walking.jpg',
        },
        {
          name: 'Core Crusher',
          description: 'Focused abdominal workout to strengthen your core and improve stability.',
          duration: 15,
          calories: 180,
          difficulty: 'intermediate',
          type: 'strength',
          targetMuscles: ['abs', 'obliques', 'lower back'],
          equipment: ['mat'],
          imageUrl: '/images/core-workout.jpg',
        },
      ];
      
      await this.workoutModel.insertMany(defaultWorkouts);
    }
  }
}
