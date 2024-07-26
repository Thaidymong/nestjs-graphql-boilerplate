import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString({ message: 'first name be string' })
  @IsNotEmpty({ message: 'first name not be empty' })
  first_name: string;

  @Field(() => String)
  @IsString({ message: 'last name must be string' })
  @IsNotEmpty({ message: 'last name must not be empty' })
  last_name: string;

  @Field(() => String)
  @IsString({ message: 'email must be string' })
  @IsNotEmpty({ message: 'email must not be empty' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string;
}
