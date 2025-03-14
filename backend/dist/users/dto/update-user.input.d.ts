import { UserProfileInput } from './create-user.input';
export declare class UpdateUserInput {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    profile?: UserProfileInput;
}
