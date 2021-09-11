import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFollowDto {
  @ApiProperty({
    name: 'follow_user_id',
    example: 'f82b1b55-cf51-417c-b365-3edad668baba',
  })
  @IsUUID()
  follow_user_id: string;
}
