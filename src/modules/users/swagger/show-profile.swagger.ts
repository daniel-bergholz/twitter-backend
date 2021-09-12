import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Tweet } from 'src/modules/tweets/entities/tweet.entity';
import { User } from '../entities/user.entity';

class ProfileTweet extends OmitType(Tweet, ['user']) {}

export class ShowProfileSwagger extends OmitType(User, [
  'follows',
  'followers',
  'password',
]) {
  @ApiProperty({ type: ProfileTweet, isArray: true })
  tweets: Tweet[];
}
