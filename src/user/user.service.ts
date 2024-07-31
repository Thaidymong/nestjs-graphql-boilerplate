import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/input';
import * as bcrypt from 'bcrypt';
import { AllUserResponse, CreateUserResponse } from './dto/response/user.response';
import { UserRepository } from './repositoties/user.repositoty';
import { GraphQLError } from 'graphql';

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

    async findAll(): Promise<AllUserResponse> {
        try {
            const users = await this.userRepository.find();
            return { data: users }

        } catch (error) {
            if (error instanceof GraphQLError) {
                throw error;
            } else {
                throw new GraphQLError('Internal server error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                    },
                });
            }
        }
    }

    async findUserById(id: string): Promise<CreateUserResponse> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            return { data: user }

        } catch (error) {
            if (error instanceof GraphQLError) {
                throw error;
            } else {
                throw new GraphQLError('Internal server error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                    },
                });
            }
        }
    }

    async findUserByEmail(email: string): Promise<CreateUserResponse> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return { data: user }

        } catch (error) {
            if (error instanceof GraphQLError) {
                throw error;
            } else {
                throw new GraphQLError('Internal server error', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                    },
                });
            }
        }
    }
}
