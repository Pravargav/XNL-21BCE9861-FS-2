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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const workout_schema_1 = require("./schemas/workout.schema");
const recommendation_service_1 = require("./services/recommendation.service");
let WorkoutService = class WorkoutService {
    constructor(workoutModel, recommendationService) {
        this.workoutModel = workoutModel;
        this.recommendationService = recommendationService;
    }
    async onModuleInit() {
        await this.recommendationService.seedDefaultWorkouts();
    }
    async create(createWorkoutDto) {
        const createdWorkout = new this.workoutModel(createWorkoutDto);
        return createdWorkout.save();
    }
    async findAll() {
        return this.workoutModel.find().exec();
    }
    async findOne(id) {
        return this.workoutModel.findById(id).exec();
    }
    async update(id, updateWorkoutDto) {
        return this.workoutModel
            .findByIdAndUpdate(id, updateWorkoutDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.workoutModel.findByIdAndDelete(id).exec();
    }
    async filter(type, difficulty, duration) {
        const query = {};
        if (type)
            query.type = type;
        if (difficulty)
            query.difficulty = difficulty;
        if (duration)
            query.duration = { $lte: duration };
        return this.workoutModel.find(query).exec();
    }
    async findRecommended() {
        return this.workoutModel.find({ isRecommended: true }).limit(5).exec();
    }
    async findByTypes(types) {
        return this.workoutModel.find({ type: { $in: types } }).exec();
    }
    async findByDifficulty(difficulty) {
        return this.workoutModel.find({ difficulty }).exec();
    }
    async findByEquipment(equipment) {
        return this.workoutModel.find({ equipment: { $in: equipment } }).exec();
    }
    async findByTargetMuscles(muscles) {
        return this.workoutModel.find({ targetMuscles: { $in: muscles } }).exec();
    }
    async findSimilar(workoutId) {
        const workout = await this.workoutModel.findById(workoutId).exec();
        if (!workout)
            return [];
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
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workout_schema_1.Workout.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        recommendation_service_1.RecommendationService])
], WorkoutService);
//# sourceMappingURL=workout.service.js.map