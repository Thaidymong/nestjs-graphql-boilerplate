import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { AllUserResponse, CreateUserResponse, UpdateUserResponse } from '../dto/response';
import { CreateUserDto, UpdateUserDto } from '../dto/input';
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

  @Mutation(() => UpdateUserResponse)
  async updateUserProfile(@Args('id') id: string, @Args('input') input: UpdateUserDto): Promise<UpdateUserResponse> {
    return await this.userService.updateUser(id, input);
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
