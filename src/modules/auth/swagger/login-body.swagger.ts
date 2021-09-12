import { ApiProperty } from '@nestjs/swagger';

export class LoginBodySwagger {
  @ApiProperty({ example: 'bergholz.daniel@gmail.com' })
  email: string;

  @ApiProperty({ example: '123123123' })
  password: string;
}
