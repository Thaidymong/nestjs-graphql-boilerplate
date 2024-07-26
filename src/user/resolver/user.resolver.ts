import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { CreateUserResponse } from '../dto/response';
import { CreateUserDto } from '../dto/input';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(() => String)
    async getUser() {
        return 'Hello, World!'
    }

    @Mutation(() => CreateUserResponse)
    async create(@Args('input') input: CreateUserDto): Promise<CreateUserResponse> {
        return await this.userService.create(input);
    }

}
