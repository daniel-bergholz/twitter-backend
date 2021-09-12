import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

class FollowUser extends OmitType(User, [
  'tweets',
  'password',
  'follows',
  'followers',
]) {}

export class ShowFollowsSwagger extends OmitType(User, ['tweets', 'password']) {
  @ApiProperty({
    type: FollowUser,
    isArray: true,
  })
  follows: User[];

  @ApiProperty({
    type: FollowUser,
    isArray: true,
  })
  followers: User[];
}
