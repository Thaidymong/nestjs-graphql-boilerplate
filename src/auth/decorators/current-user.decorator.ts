import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserResponse } from 'src/user/dto/response/user.response';

export const getMeByContext = (context: ExecutionContext): UserResponse => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const ctx = GqlExecutionContext.create(context);

  return ctx.getContext().req.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getMeByContext(context),
);
