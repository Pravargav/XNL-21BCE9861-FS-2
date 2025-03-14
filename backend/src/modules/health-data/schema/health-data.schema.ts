import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HealthDataDocument = HealthData & Document;

@Schema({ timestamps: true })
export class HealthData {
  @Prop()
  userId: string;

  @Prop()
  date: Date;

  @Prop()
  steps: number;

  @Prop()
  calories: number;

  @Prop()
  activeMinutes: number;

  @Prop()
  avgHeartRate: number;
}

export const HealthDataSchema = SchemaFactory.createForClass(HealthData);