import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
    @Field(() => String)
    @IsString({ message: 'first name be string' })
    @IsNotEmpty({ message: 'first name not be empty' })
    first_name: string;

    @Field(() => String)
    @IsString({ message: 'last name must be string' })
    @IsNotEmpty({ message: 'last name must not be empty' })
    last_name: string;
}
