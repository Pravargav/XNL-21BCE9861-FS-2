import { Document } from 'mongoose';
import { Types } from 'mongoose';
export type WorkoutDocument = Workout & Document;
export declare class Workout {
    name: string;
    description: string;
    duration: number;
    calories: number;
    difficulty: string;
    type: string;
    targetMuscles: string[];
    equipment: string[];
    imageUrl: string;
    isRecommended: boolean;
    userId: string;
}
export declare const WorkoutSchema: import("mongoose").Schema<Workout, import("mongoose").Model<Workout, any, any, any, Document<unknown, any, Workout> & Workout & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workout, Document<unknown, {}, import("mongoose").FlatRecord<Workout>> & import("mongoose").FlatRecord<Workout> & {
    _id: Types.ObjectId;
}>;
