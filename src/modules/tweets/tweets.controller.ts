import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';

@Controller()
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('tweets')
  create(
    @Body() createTweetDto: CreateTweetDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.tweetsService.create(createTweetDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('tweets/:id')
  remove(@Param() idDto: IdDto, @Request() req: AuthMiddlewareRequest) {
    return this.tweetsService.remove(idDto, req);
  }
}
