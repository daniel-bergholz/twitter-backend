import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from 'src/modules/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginBodySwagger } from './swagger/login-body.swagger';
import { LoginSwagger } from './swagger/login.swagger';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Autentica o usuário',
    description:
      'Ao passar email e senha, essa rota retorna informações do usuário logado e gera um token JWT que deve ser usado no header de rotas protegidas.',
  })
  @ApiResponse({ type: LoginSwagger, status: 201 })
  @ApiBody({
    type: LoginBodySwagger,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user as User);
  }
}
