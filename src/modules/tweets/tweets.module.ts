import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Tweet } from './entities/tweet.entity';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
