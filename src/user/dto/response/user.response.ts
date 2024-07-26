import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class AllUserResponse {
  @Field(() => [UserResponse], { nullable: true })
  data: UserResponse[];
}

@ObjectType()
export class CreateUserResponse {
  @Field(() => UserResponse, { nullable: true })
  data: UserResponse;
}
