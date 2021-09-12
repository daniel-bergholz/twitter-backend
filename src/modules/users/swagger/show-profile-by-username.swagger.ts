import { ApiProperty } from '@nestjs/swagger';
import { ShowProfileSwagger } from './show-profile.swagger';

export class ShowProfileByUsernameSwagger extends ShowProfileSwagger {
  @ApiProperty()
  isFollowing: boolean;
}
