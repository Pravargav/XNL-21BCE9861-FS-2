"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const workout_schema_1 = require("../schemas/workout.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
const health_data_service_1 = require("../../health-data/health-data.service");
const generative_ai_1 = require("@google/generative-ai");
let RecommendationService = class RecommendationService {
    constructor(workoutModel, userModel, healthDataService, configService) {
        this.workoutModel = workoutModel;
        this.userModel = userModel;
        this.healthDataService = healthDataService;
        this.configService = configService;
        const apiKey = this.configService.get('gemini.apiKey');
        if (apiKey) {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
        }
    }
    async getRecommendations(userId) {
        if (!this.genAI) {
            return this.getDefaultRecommendations();
        }
        try {
            const user = await this.userModel.findById(userId).exec();
            if (!user) {
                return this.getDefaultRecommendations();
            }
            const healthData = await this.healthDataService.findWeeklySummary(userId);
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
            const allWorkouts = await this.workoutModel.find().exec();
            const formattedWorkouts = allWorkouts.map(workout => ({
                id: workout._id.toString(),
                name: workout.name,
                type: workout.type,
                difficulty: workout.difficulty,
                duration: workout.duration,
                calories: workout.calories,
                targetMuscles: workout.targetMuscles,
            }));
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
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const responseText = response.text();
            const workoutIds = this.parseGeminiResponse(responseText);
            if (workoutIds.length > 0) {
                return this.workoutModel.find({ _id: { $in: workoutIds } }).exec();
            }
            else {
                return this.getDefaultRecommendations();
            }
        }
        catch (error) {
            console.error('Error generating workout recommendations:', error);
            return this.getDefaultRecommendations();
        }
    }
    parseGeminiResponse(response) {
        try {
            const match = response.match(/\[.*?\]/s);
            if (match) {
                const jsonStr = match[0];
                const workoutIds = JSON.parse(jsonStr);
                return Array.isArray(workoutIds) ? workoutIds : [];
            }
            return [];
        }
        catch (error) {
            console.error('Error parsing Gemini response:', error);
            return [];
        }
    }
    calculateAverage(data, field) {
        if (!data || data.length === 0)
            return 0;
        const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0);
        return Math.round(sum / data.length);
    }
    async getDefaultRecommendations() {
        const beginner = await this.workoutModel.findOne({ difficulty: 'beginner' }).exec();
        const cardio = await this.workoutModel.findOne({ type: 'cardio' }).exec();
        const strength = await this.workoutModel.findOne({ type: 'strength' }).exec();
        const flexibility = await this.workoutModel.findOne({ type: 'flexibility' }).exec();
        return [beginner, cardio, strength, flexibility].filter(Boolean);
    }
    async seedDefaultWorkouts() {
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
};
exports.RecommendationService = RecommendationService;
exports.RecommendationService = RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workout_schema_1.Workout.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        health_data_service_1.HealthDataService,
        config_1.ConfigService])
], RecommendationService);
//# sourceMappingURL=recommendation.service.js.map