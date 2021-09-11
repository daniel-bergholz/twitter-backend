import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    name: 'bio',
    example: 'Olá, sou o Daniel Berg, CTO do Maratonas Academy :)',
    default: null,
  })
  @IsOptional()
  @IsString({ message: 'A bio precisa ser uma string' })
  bio: string;

  @ApiPropertyOptional({ name: 'name', example: 'Daniel Gobbi' })
  @IsOptional()
  @IsString({ message: 'O campo name deve ser uma string' })
  name: string;

  @ApiPropertyOptional({
    name: 'password',
    example: 'abcd1234',
    description: 'A senha precisa ter no mínimo 8 caracteres',
  })
  @MinLength(8, {
    message: 'O campo password precisa ter no mínimo 8 caracteres',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsOptional()
  password: string;
}
