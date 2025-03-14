"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthDataModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const health_data_controller_1 = require("./health-data.controller");
const health_data_service_1 = require("./health-data.service");
const health_data_schema_1 = require("./schema/health-data.schema");
let HealthDataModule = class HealthDataModule {
};
exports.HealthDataModule = HealthDataModule;
exports.HealthDataModule = HealthDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: health_data_schema_1.HealthData.name, schema: health_data_schema_1.HealthDataSchema },
            ]),
        ],
        controllers: [health_data_controller_1.HealthDataController],
        providers: [health_data_service_1.HealthDataService],
        exports: [health_data_service_1.HealthDataService],
    })
], HealthDataModule);
//# sourceMappingURL=health-data.module.js.map