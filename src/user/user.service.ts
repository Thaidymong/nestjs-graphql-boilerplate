import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) 
        private readonly userRepository: Repository<User>
) { }
    async createUser(input:{email: string, password: string}) {
        const isUser = await this.userRepository.save(input);
        return isUser;
    }
}
