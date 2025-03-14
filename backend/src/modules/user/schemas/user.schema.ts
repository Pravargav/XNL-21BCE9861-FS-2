
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ default: 'beginner' })
  fitnessLevel: string;

  @Prop({ default: 'weight_loss' })
  fitnessGoal: string;
}

export const UserSchema = SchemaFactory.createForClass(User);