import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import {
  LoginResponse,
  RefreshTokenResponse,
} from '../dto/response/login.response';
import { LoginDto } from '../dto/input/login.input';
import { Public } from '../decorators/public.decorator';
import { UserResponse } from 'src/user/dto/response';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators';
import { RefreshTokenDto } from '../dto/input/refresh-token.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginDto) {
    return await this.authService.login(input);
  }

  @Public()
  @Mutation(() => RefreshTokenResponse)
  async refreshToken(
    @Args('input') input: RefreshTokenDto,
  ): Promise<RefreshTokenResponse> {
    return await this.authService.refreshToken(input);
  }

  @Query(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: UserResponse) {
    return user;
  }
}
