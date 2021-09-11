import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TweetsModule } from './modules/tweets/tweets.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, TweetsModule],
})
export class AppModule {}
