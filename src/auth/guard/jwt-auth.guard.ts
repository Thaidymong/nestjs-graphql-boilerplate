import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import { Request } from 'express';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../decorators/public.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request;

    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else {
      request = this.getRequest(context);
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new GraphQLError(`You aitn't provided token!`, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      })) as { userId: string };

      if (!payload.userId) {
        throw new GraphQLError(`Invalid token`, {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

      const foundUser = await this.userService.findUserById(payload.userId);

      if (!foundUser?.data) {
        throw new GraphQLError(`Unauthorized`, {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

      request.user = foundUser?.data;

      return true;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else if (error instanceof JsonWebTokenError) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      } else {
        throw new GraphQLError('Authentication Error', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
