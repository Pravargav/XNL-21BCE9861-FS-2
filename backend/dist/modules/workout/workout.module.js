"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const workout_controller_1 = require("./workout.controller");
const workout_service_1 = require("./workout.service");
const workout_schema_1 = require("./schemas/workout.schema");
const recommendation_service_1 = require("./services/recommendation.service");
const health_data_module_1 = require("../health-data/health-data.module");
const user_module_1 = require("../user/user.module");
const user_schema_1 = require("../user/schemas/user.schema");
const config_1 = require("@nestjs/config");
let WorkoutModule = class WorkoutModule {
};
exports.WorkoutModule = WorkoutModule;
exports.WorkoutModule = WorkoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: workout_schema_1.Workout.name, schema: workout_schema_1.WorkoutSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            health_data_module_1.HealthDataModule,
            user_module_1.UserModule,
            config_1.ConfigModule,
        ],
        controllers: [workout_controller_1.WorkoutController],
        providers: [workout_service_1.WorkoutService, recommendation_service_1.RecommendationService],
        exports: [workout_service_1.WorkoutService, recommendation_service_1.RecommendationService],
    })
], WorkoutModule);
//# sourceMappingURL=workout.module.js.map