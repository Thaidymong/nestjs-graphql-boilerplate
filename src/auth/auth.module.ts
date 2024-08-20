import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthResolver } from './resolver/auth.resolver';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/repositoties/user.repositoty';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    UserRepository,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
