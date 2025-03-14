export declare class CreateHealthDataDto {
    userId: string;
    date: Date;
    steps?: number;
    calories?: number;
    activeMinutes?: number;
    avgHeartRate?: number;
}
export declare class UpdateHealthDataDto {
    steps?: number;
    calories?: number;
    activeMinutes?: number;
    avgHeartRate?: number;
}
