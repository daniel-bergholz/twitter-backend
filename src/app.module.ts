import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
// import { FollowsModule } from './modules/follows/follows.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule],
})
export class AppModule {}
