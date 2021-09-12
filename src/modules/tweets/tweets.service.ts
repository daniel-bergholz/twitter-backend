import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { In, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private tweetsRepository: Repository<Tweet>,
    private usersService: UsersService,
  ) {}

  async create(createTweetDto: CreateTweetDto, req: AuthMiddlewareRequest) {
    const { content } = createTweetDto;
    const { user } = req;

    await this.tweetsRepository.save({ content, user });
  }

  async findAll() {
    return this.tweetsRepository.find({ relations: ['user'] });
  }

  async feed(req: AuthMiddlewareRequest): Promise<Tweet[]> {
    const user = await this.usersService.showUserFollowsAndFollowers(req);
    const ids = [user.id, ...user.follows.map((follow) => follow.id)];

    return this.tweetsRepository.find({
      where: { user: { id: In(ids) } },
      relations: ['user'],
    });
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
