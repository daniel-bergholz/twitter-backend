import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthMiddlewareRequest } from '../../../shared/dto/auth-middleware.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { UsersService } from '../users.service';

@ApiTags('Seguindo')
@Controller('follows')
export class FollowsController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Dá follow em um usuário',
    description: 'Cria um follow a partir do ID do usuário',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createFollow(
    @Body() createFollowDto: CreateFollowDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.createFollow(createFollowDto, req);
  }

  @ApiOperation({
    summary: 'Dá unfollow em um usuário',
    description: 'Deleta o follow a partir do ID do usuário',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  removeFollow(
    @Body() createFollowDto: CreateFollowDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.removeFollow(createFollowDto, req);
  }
}
