import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { TweetsService } from '../tweets.service';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createTweetDto: CreateTweetDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.tweetsService.create(createTweetDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() idDto: IdDto, @Request() req: AuthMiddlewareRequest) {
    return this.tweetsService.remove(idDto, req);
  }
}
