import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema({ timestamps: true })
export class Workout {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  calories: number;

  @Prop({ required: true })
  difficulty: string; // beginner, intermediate, advanced

  @Prop({ required: true })
  type: string; // cardio, strength, flexibility, etc.

  @Prop({ type: [String], default: [] })
  targetMuscles: string[];

  @Prop({ type: [String], default: [] })
  equipment: string[];

  @Prop()
  imageUrl: string;
  
  @Prop({ default: false })
  isRecommended: boolean;

  @Prop({ required: true })
  userId: string;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
