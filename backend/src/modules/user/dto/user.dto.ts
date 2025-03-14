
export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    age?: number;
    height?: number;
    weight?: number;
    fitnessLevel?: string;
    fitnessGoal?: string;
  }
  
  export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    age?: number;
    height?: number;
    weight?: number;
    fitnessLevel?: string;
    fitnessGoal?: string;
  }