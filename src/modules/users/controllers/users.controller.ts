import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/shared/dto/search.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsernameDto } from '../dto/username.dto';
import { UsersService } from '../users.service';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Cria um usuário',
    description:
      'Cria uma conta no twitter a partir de nome, email, senha e username',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Pesquisa usuários',
    description:
      'Lista todos os usuário, e caso contenha a query string pesquisa=username, procura o usuário pelo username',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.usersService.findAll(searchDto);
  }

  @ApiOperation({
    summary: 'Mostra o perfil de um usuário',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  showProfileByUsername(@Param() usernameDto: UsernameDto) {
    return this.usersService.showProfileByUsername(usernameDto);
  }

  @ApiOperation({
    summary: 'Mostra quem um usuário está seguindo e os seus seguidores',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':username/follows')
  showUserFollowsByUsername(@Param() usernameDto: UsernameDto) {
    return this.usersService.showUserFollowsAndFollowersByUsername(usernameDto);
  }
}
