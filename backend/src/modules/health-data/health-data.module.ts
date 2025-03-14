import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthDataController } from './health-data.controller';
import { HealthDataService } from './health-data.service';
import { HealthData, HealthDataSchema } from './schema/health-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HealthData.name, schema: HealthDataSchema },
    ]),
  ],
  controllers: [HealthDataController],
  providers: [HealthDataService],
  exports: [HealthDataService],
})
export class HealthDataModule {}
