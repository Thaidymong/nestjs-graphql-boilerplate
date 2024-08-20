import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { AllUserResponse, CreateUserResponse } from '../dto/response';
import { CreateUserDto } from '../dto/input';
import { Public } from 'src/auth/decorators';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => CreateUserResponse)
  async create(
    @Args('input') input: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return await this.userService.create(input);
  }

  @Query(() => AllUserResponse)
  async getAllUsers(): Promise<AllUserResponse> {
    return await this.userService.findAll();
  }

  @Query(() => CreateUserResponse)
  async userByID(@Args('id', { type: () => String }) id: string) {
    return this.userService.findUserById(id);
  }

  @Query(() => CreateUserResponse)
  async userByEmail(@Args('email', { type: () => String }) email: string) {
    return await this.userService.findUserByEmail(email);
  }
}
