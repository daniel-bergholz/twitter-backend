import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { Tweet } from '../entities/tweet.entity';

class FeedUser extends OmitType(User, [
  'tweets',
  'followers',
  'follows',
  'password',
]) {}

export class FeedSwagger extends Tweet {
  @ApiProperty({
    type: FeedUser,
  })
  user: User;
}
