import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { SearchDto } from 'src/shared/dto/search.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsernameDto } from '../dto/username.dto';
import { CreateUserSwagger } from '../swagger/create-user.swagger';
import { FindUsersSwagger } from '../swagger/find-users.swagger';
import { ShowFollowsSwagger } from '../swagger/show-follows.swagger';
import { ShowProfileByUsernameSwagger } from '../swagger/show-profile-by-username.swagger';
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
  @ApiResponse({ status: 201, type: CreateUserSwagger })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Pesquisa usuários',
    description:
      'Lista todos os usuário, e caso contenha a query string pesquisa=username, procura o usuário pelo username',
  })
  @ApiResponse({ status: 200, type: FindUsersSwagger, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query() searchDto: SearchDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.findAll(searchDto, req);
  }

  @ApiOperation({
    summary: 'Mostra o perfil de um usuário',
  })
  @ApiResponse({ type: ShowProfileByUsernameSwagger, status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  showProfileByUsername(
    @Param() usernameDto: UsernameDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.showProfileByUsername(usernameDto, req);
  }

  @ApiOperation({
    summary: 'Mostra quem um usuário está seguindo e os seus seguidores',
  })
  @ApiResponse({ type: ShowFollowsSwagger, status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':username/follows')
  showUserFollowsByUsername(@Param() usernameDto: UsernameDto) {
    return this.usersService.showUserFollowsAndFollowersByUsername(usernameDto);
  }
}
