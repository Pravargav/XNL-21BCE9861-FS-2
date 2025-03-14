export declare class CreateUserInput {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    profile?: UserProfileInput;
}
export declare class UserProfileInput {
    weight?: number;
    height?: number;
    gender?: string;
    dateOfBirth?: Date;
    fitnessGoals: string[];
    healthConditions: string[];
}
