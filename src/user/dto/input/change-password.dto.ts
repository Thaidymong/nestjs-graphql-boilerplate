import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordDto {
  @Field(() => String)
  currentPassword: string;

  @Field(() => String)
  password: string;
}
