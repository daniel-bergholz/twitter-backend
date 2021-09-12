import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserSwagger extends PickType(User, [
  'id',
  'email',
  'username',
  'bio',
  'name',
]) {}
