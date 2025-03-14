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
exports.HealthDataController = void 0;
const common_1 = require("@nestjs/common");
const health_data_service_1 = require("./health-data.service");
const health_data_dto_1 = require("./dto/health-data.dto");
let HealthDataController = class HealthDataController {
    constructor(healthDataService) {
        this.healthDataService = healthDataService;
    }
    create(createHealthDataDto) {
        return this.healthDataService.create(createHealthDataDto);
    }
    findByUserId(userId) {
        return this.healthDataService.findByUserId(userId);
    }
    findDailySummary(userId, date) {
        return this.healthDataService.findDailySummary(userId, new Date(date));
    }
    findWeeklySummary(userId) {
        return this.healthDataService.findWeeklySummary(userId);
    }
    update(id, updateHealthDataDto) {
        return this.healthDataService.update(id, updateHealthDataDto);
    }
};
exports.HealthDataController = HealthDataController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [health_data_dto_1.CreateHealthDataDto]),
    __metadata("design:returntype", void 0)
], HealthDataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HealthDataController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)('user/:userId/daily'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HealthDataController.prototype, "findDailySummary", null);
__decorate([
    (0, common_1.Get)('user/:userId/weekly'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HealthDataController.prototype, "findWeeklySummary", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, health_data_dto_1.UpdateHealthDataDto]),
    __metadata("design:returntype", void 0)
], HealthDataController.prototype, "update", null);
exports.HealthDataController = HealthDataController = __decorate([
    (0, common_1.Controller)('health-data'),
    __metadata("design:paramtypes", [health_data_service_1.HealthDataService])
], HealthDataController);
//# sourceMappingURL=health-data.controller.js.map