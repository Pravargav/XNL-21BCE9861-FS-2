import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findMe(user: User): Promise<any>;
    updateUser(updateUserInput: UpdateUserInput): Promise<any>;
    removeUser(id: string): Promise<any>;
}
