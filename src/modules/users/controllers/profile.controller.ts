import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthMiddlewareRequest } from '../../../shared/dto/auth-middleware.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../users.service';

@ApiTags('Perfil')
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  showProfile(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.updateProfile(req, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.remove(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('follows')
  showUserFollows(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showUserFollowsAndFollowers(req);
  }
}
