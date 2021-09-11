import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Tweet } from './entities/tweet.entity';
import { TweetsController } from './controllers/tweets.controller';
import { TweetsService } from './tweets.service';
import { FeedController } from './controllers/feed.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule],
  controllers: [TweetsController, FeedController],
  providers: [TweetsService],
})
export class TweetsModule {}
