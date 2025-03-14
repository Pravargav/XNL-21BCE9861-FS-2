import { HealthDataService } from './health-data.service';
import { CreateHealthDataDto, UpdateHealthDataDto } from './dto/health-data.dto';
export declare class HealthDataController {
    private readonly healthDataService;
    constructor(healthDataService: HealthDataService);
    create(createHealthDataDto: CreateHealthDataDto): Promise<import("./schema/health-data.schema").HealthData>;
    findByUserId(userId: string): Promise<import("./schema/health-data.schema").HealthData[]>;
    findDailySummary(userId: string, date: string): Promise<import("./schema/health-data.schema").HealthData>;
    findWeeklySummary(userId: string): Promise<any[]>;
    update(id: string, updateHealthDataDto: UpdateHealthDataDto): Promise<import("./schema/health-data.schema").HealthData>;
}
