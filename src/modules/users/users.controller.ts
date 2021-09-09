import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SearchDto } from 'src/shared/dto/search.dto';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { AuthMiddlewareRequest } from '../../shared/dto/auth-middleware.dto';
import { IdDto } from '../../shared/dto/id.dto';
import { CreateFollowDto } from './dto/create-follow.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll(@Query() searchDto: SearchDto) {
    return this.usersService.findAll(searchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  findOne(@Param() idDto: IdDto) {
    return this.usersService.findOne(idDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  showProfile(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.updateProfile(req, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  update(@Param() idDto: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idDto, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  remove(@Param() idDto: IdDto) {
    return this.usersService.remove(idDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('follows')
  showUserFollows(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showUserFollows(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('followers')
  showUserFollowers(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showUserFollowers(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('follows')
  createFollow(
    @Body() createFollowDto: CreateFollowDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.createFollow(createFollowDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('follows')
  removeFollow(
    @Body() createFollowDto: CreateFollowDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.removeFollow(createFollowDto, req);
  }
}
