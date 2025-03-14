import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthData, HealthDataDocument } from './schema/health-data.schema';
import { CreateHealthDataDto, UpdateHealthDataDto } from './dto/health-data.dto';

@Injectable()
export class HealthDataService {
  constructor(
    @InjectModel(HealthData.name)
    private readonly healthDataModel: Model<HealthDataDocument>,
  ) {}

  async create(createHealthDataDto: CreateHealthDataDto): Promise<HealthData> {
    const createdHealthData = new this.healthDataModel(createHealthDataDto);
    return createdHealthData.save();
  }

  async findByUserId(userId: string): Promise<HealthData[]> {
    return this.healthDataModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async findDailySummary(userId: string, date: Date): Promise<HealthData> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return this.healthDataModel
      .findOne({
        userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .exec();
  }

  async findWeeklySummary(userId: string): Promise<any[]> {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const data = await this.healthDataModel
      .find({
        userId,
        date: {
          $gte: weekAgo,
          $lte: today,
        },
      })
      .sort({ date: 1 })
      .exec();

    return data.map(item => ({
      date: item.date,
      steps: item.steps,
      calories: item.calories,
      activeMinutes: item.activeMinutes,
      avgHeartRate: item.avgHeartRate,
    }));
  }

  async update(id: string, updateHealthDataDto: UpdateHealthDataDto): Promise<HealthData> {
    return this.healthDataModel
      .findByIdAndUpdate(id, updateHealthDataDto, { new: true })
      .exec();
  }
}
