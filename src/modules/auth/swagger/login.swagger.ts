import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

class AuthUser extends PickType(User, ['id', 'name', 'email']) {}

export class LoginSwagger {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: AuthUser })
  user: User;
}
