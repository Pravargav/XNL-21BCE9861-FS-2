import { Model } from 'mongoose';
import { HealthData, HealthDataDocument } from './schema/health-data.schema';
import { CreateHealthDataDto, UpdateHealthDataDto } from './dto/health-data.dto';
export declare class HealthDataService {
    private readonly healthDataModel;
    constructor(healthDataModel: Model<HealthDataDocument>);
    create(createHealthDataDto: CreateHealthDataDto): Promise<HealthData>;
    findByUserId(userId: string): Promise<HealthData[]>;
    findDailySummary(userId: string, date: Date): Promise<HealthData>;
    findWeeklySummary(userId: string): Promise<any[]>;
    update(id: string, updateHealthDataDto: UpdateHealthDataDto): Promise<HealthData>;
}
