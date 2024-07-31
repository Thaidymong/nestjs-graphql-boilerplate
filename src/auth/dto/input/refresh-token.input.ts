import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenDto {
  @Field(() => String)
  refreshToken: string;
}
