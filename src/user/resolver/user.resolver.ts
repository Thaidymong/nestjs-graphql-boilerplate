import { Args, Field, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { CreateUserInput } from '../dto/input/create-user.input';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(() => String)
    async getUser() {
        return 'Hello, World!'
    }

    @Mutation(() => User)
    async createUserMutation(@Args('input') input: CreateUserInput) {
        return this.userService.createUser(input)
    }

}
