import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/input';
import * as bcrypt from 'bcrypt';
import {
  AllUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
} from './dto/response/user.response';
import { UserRepository } from './repositoties/user.repositoty';
import { GraphQLError } from 'graphql';
import { ERROR_MESSAGES, ERRORSTATUSCODE } from 'src/errors';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

    return { data: newUser };
  }

  async findAll(): Promise<AllUserResponse> {
    try {
      const users = await this.userRepository.find();
      return { data: users };
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
      return { data: user };
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
      return { data: user };
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

  async updateUser(id: string, input: UpdateUserDto): Promise<UpdateUserResponse> {
    try {
      const foundUser = await this.userRepository.findOneBy({ id });
      if (!foundUser) {
        throw new GraphQLError(ERROR_MESSAGES.NOT_FOUND, {
          extensions: {
            code: ERRORSTATUSCODE.NOT_FOUND,
          },
        });
      }

      const updateInput = { ...foundUser, ...input };

      return {
        data: await this.userRepository.save(updateInput),
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new GraphQLError(ERROR_MESSAGES.BAD_REQUEST, {
          extensions: {
            code: ERRORSTATUSCODE.BAD_REQUEST,
          },
        });
      }
    }
  }
}
