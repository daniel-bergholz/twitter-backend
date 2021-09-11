import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString({ message: 'O campo content deve ser uma string' })
  @IsNotEmpty({ message: 'O campo content não pode ser vazio' })
  content: string;
}
