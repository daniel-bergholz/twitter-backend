import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/shared/dto/search.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsernameDto } from '../dto/username.dto';
import { UsersService } from '../users.service';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.usersService.findAll(searchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  showProfileByUsername(@Param() usernameDto: UsernameDto) {
    return this.usersService.showProfileByUsername(usernameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/follows')
  showUserFollowsByUsername(@Param() usernameDto: UsernameDto) {
    return this.usersService.showUserFollowsAndFollowersByUsername(usernameDto);
  }
}
