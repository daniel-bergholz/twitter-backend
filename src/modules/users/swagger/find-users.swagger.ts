import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindUsersSwagger extends OmitType(User, [
  'tweets',
  'followers',
  'follows',
  'password',
  'number_of_followers',
  'number_of_follows',
]) {}
