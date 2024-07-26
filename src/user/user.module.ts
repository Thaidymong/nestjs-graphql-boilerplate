import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService]
})
export class UserModule {}
