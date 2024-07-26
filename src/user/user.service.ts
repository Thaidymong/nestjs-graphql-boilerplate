import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/input';
import * as bcrypt from 'bcrypt';
import { CreateUserResponse } from './dto/response/user.response';
import { UserRepository } from './repositoties/user.repositoty';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(input: CreateUserDto): Promise<CreateUserResponse> {
        const { email, password, first_name, last_name } = input;
        const user = await this.userRepository.findOne({ where: { email } });

        if (user) {
            throw new BadRequestException('User with this email does exists!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userRepository.save({
            email,
            password: hashedPassword,
            first_name,
            last_name,
        });

        return { data: newUser }
    }
}
