import { IsString } from 'class-validator';

export class UsernameDto {
  @IsString({ message: 'O campo username é obrigatório' })
  username: string;
}
