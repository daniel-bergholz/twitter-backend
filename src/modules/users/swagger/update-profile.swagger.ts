import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateProfileSwagger extends PickType(User, [
  'id',
  'name',
  'username',
  'bio',
  'email',
]) {}
