import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { FeedSwagger } from '../swagger/feed.swagger';
import { TweetsService } from '../tweets.service';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly tweetsService: TweetsService) {}

  @ApiOperation({
    summary: 'Mostra o feed do usuário logado',
    description: 'Retorna os tweets das pessoas que você segue',
  })
  @ApiBearerAuth()
  @ApiResponse({ type: FeedSwagger, status: 200, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  feed(@Request() req: AuthMiddlewareRequest) {
    return this.tweetsService.feed(req);
  }
}
