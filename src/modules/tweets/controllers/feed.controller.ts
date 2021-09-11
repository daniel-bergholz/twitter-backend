import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TweetsService } from '../tweets.service';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  feed(@Request() req: AuthMiddlewareRequest) {
    return this.tweetsService.feed(req);
  }
}
