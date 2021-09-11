import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { TweetsService } from '../tweets.service';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @ApiOperation({
    summary: 'Cria um tweet',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createTweetDto: CreateTweetDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.tweetsService.create(createTweetDto, req);
  }

  @ApiOperation({
    summary: 'Deleta um tweet',
    description: 'Apaga um tweet a partir do ID dele',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() idDto: IdDto, @Request() req: AuthMiddlewareRequest) {
    return this.tweetsService.remove(idDto, req);
  }
}
