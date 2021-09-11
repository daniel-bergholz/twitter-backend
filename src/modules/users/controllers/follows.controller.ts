import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthMiddlewareRequest } from '../../../shared/dto/auth-middleware.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { UsersService } from '../users.service';

@ApiTags('Seguindo')
@Controller('follows')
export class FollowsController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createFollow(
    @Body() createFollowDto: CreateFollowDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.createFollow(createFollowDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeFollow(
    @Body() createFollowDto: CreateFollowDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.removeFollow(createFollowDto, req);
  }
}
