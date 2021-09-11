import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({ name: 'content', example: 'Meu primeiro tweet!' })
  @IsString({ message: 'O campo content deve ser uma string' })
  @IsNotEmpty({ message: 'O campo content não pode ser vazio' })
  content: string;
}
