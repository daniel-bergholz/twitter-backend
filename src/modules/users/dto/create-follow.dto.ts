import { IsUUID } from 'class-validator';

export class CreateFollowDto {
  @IsUUID()
  follow_user_id: string;
}
