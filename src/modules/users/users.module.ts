import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowsController } from './controllers/follows.controller';
import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, ProfileController, FollowsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
