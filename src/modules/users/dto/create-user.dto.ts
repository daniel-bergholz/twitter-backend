import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ name: 'name', example: 'Daniel Berg' })
  @IsNotEmpty({ message: 'O campo name não pode ser vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  name: string;

  @ApiProperty({
    name: 'email',
    example: 'bergholz.daniel@gmail.com',
  })
  @IsNotEmpty({ message: 'O campo email não pode ser vazio' })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'username',
    example: 'daniel_berg98',
    description: 'O username não pode conter caracteres especiais nem espaços',
  })
  @Matches(/^[a-z0-9_-]{3,25}$/, {
    message: 'O username não pode conter caracteres especiais nem espaços',
  })
  @IsNotEmpty({ message: 'O campo username não pode ser vazio' })
  @IsString({ message: 'O campo username deve ser uma string' })
  username: string;

  @ApiProperty({
    name: 'password',
    example: 'abcd1234',
    description: 'A senha precisa ter no mínimo 8 caracteres',
  })
  @MinLength(8, {
    message: 'O campo password precisa ter no mínimo 8 caracteres',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password não pode ser vazio' })
  password: string;
}

// Senha com no mínimo 8 caracteres, letra maiuscula e minuscula, numero e caractere especial
// @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
