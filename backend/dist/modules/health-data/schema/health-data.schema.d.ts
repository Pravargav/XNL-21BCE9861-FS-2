import { Document } from 'mongoose';
export type HealthDataDocument = HealthData & Document;
export declare class HealthData {
    userId: string;
    date: Date;
    steps: number;
    calories: number;
    activeMinutes: number;
    avgHeartRate: number;
}
export declare const HealthDataSchema: import("mongoose").Schema<HealthData, import("mongoose").Model<HealthData, any, any, any, Document<unknown, any, HealthData> & HealthData & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HealthData, Document<unknown, {}, import("mongoose").FlatRecord<HealthData>> & import("mongoose").FlatRecord<HealthData> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
