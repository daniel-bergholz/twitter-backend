import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private tweetsRepository: Repository<Tweet>,
  ) {}

  async create(createTweetDto: CreateTweetDto, req: AuthMiddlewareRequest) {
    const { content } = createTweetDto;
    const { user } = req;

    return this.tweetsRepository.save({ content, user });
  }

  async findAll() {
    return this.tweetsRepository.find({ relations: ['user'] });
  }

  async remove(idDto: IdDto, req: AuthMiddlewareRequest) {
    const { id } = idDto;
    const { user } = req;

    const tweetExists = await this.tweetsRepository.findOne(id, {
      relations: ['user'],
    });

    if (!tweetExists) {
      throw new BadRequestException(`O tweet de ID = ${id} não existe`);
    }

    if (tweetExists && tweetExists.user.id !== user.id) {
      throw new BadRequestException(
        'Você não pode deletar tweets de outras pessoas',
      );
    }

    await this.tweetsRepository.delete(tweetExists.id);
  }
}
