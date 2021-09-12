import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from 'src/shared/dto/search.dto';
import { Repository, Like } from 'typeorm';
import { AuthMiddlewareRequest } from '../../shared/dto/auth-middleware.dto';
import { IdDto } from '../../shared/dto/id.dto';
import { CreateFollowDto } from './dto/create-follow.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsernameDto } from './dto/username.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(searchDto: SearchDto): Promise<User[]> {
    const { search } = searchDto;

    if (search && search !== '') {
      return this.usersRepository.find({
        order: { created_at: 'DESC' },
        where: { username: Like(`%${search}%`) },
      });
    }

    return this.usersRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(idDto: IdDto): Promise<User> {
    const { id } = idDto;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    return user;
  }

  async showProfile(req: AuthMiddlewareRequest) {
    const { user: userFromJwt } = req;
    const { id } = userFromJwt;

    // check if user exists
    const user = await this.usersRepository.findOne(id, {
      relations: ['tweets'],
    });

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    return user;
  }

  async showProfileByUsername(usernameDto: UsernameDto) {
    const { username } = usernameDto;

    // check if user exists
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['tweets'],
    });

    if (!user) {
      throw new BadRequestException(
        `O usuário com username = ${username} não existe`,
      );
    }

    return user;
  }

  async updateProfile(
    req: AuthMiddlewareRequest,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { user: userFromJwt } = req;
    const { id } = userFromJwt;

    // check if user exists
    const user = await this.findOne({ id });

    // enable only name or password update
    const { name, password, bio } = updateUserDto;

    // error if all fields are empty
    if (!name && !password && !bio) {
      throw new BadRequestException(
        `Os campos: name, bio ou password precisam ser enviados no corpo da requisição`,
      );
    }

    // update user
    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }
    if (bio) {
      user.bio = bio;
    }

    await this.usersRepository.save(user);

    return this.removeUnwantedFields(user);
  }

  async removeFollow(
    createFollowDto: CreateFollowDto,
    req: AuthMiddlewareRequest,
  ) {
    const { follow_user_id } = createFollowDto;
    const { user: userFromJwt } = req;

    // check if user that will be followed exists
    const user = await this.usersRepository.findOne(follow_user_id);

    // check if logged user exists
    const loggedUser = await this.usersRepository.findOne(userFromJwt.id, {
      relations: ['follows'],
    });

    loggedUser.follows = loggedUser.follows.filter(
      (follow) => follow.id !== user.id,
    );

    await this.usersRepository.save(loggedUser);
  }

  async createFollow(
    createFollowDto: CreateFollowDto,
    req: AuthMiddlewareRequest,
  ) {
    const { follow_user_id } = createFollowDto;
    const { user: userFromJwt } = req;

    // check if user that will be followed exists
    const user = await this.usersRepository.findOne(follow_user_id);

    // check if logged user exists
    const loggedUser = await this.usersRepository.findOne(userFromJwt.id, {
      relations: ['follows'],
    });

    loggedUser.follows.push(user);

    await this.usersRepository.save(loggedUser);
  }

  async showUserFollowsAndFollowers(req: AuthMiddlewareRequest) {
    const { user } = req;

    return this.usersRepository.findOne(user.id, {
      relations: ['follows', 'followers'],
    });
  }

  async showUserFollowsAndFollowersByUsername(usernameDto: UsernameDto) {
    const { username } = usernameDto;

    // check if user exists
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['follows', 'followers'],
    });

    if (!user) {
      throw new BadRequestException(
        `O usuário com username = ${username} não existe`,
      );
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, password, username } = createUserDto;
    const email = createUserDto.email.toLowerCase();

    // check if user exists by the lowercase email or username
    const userExists = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (userExists) {
      throw new BadRequestException(
        `O email ${email} ou username ${username} não está disponível`,
      );
    }

    // create new user
    const user = this.usersRepository.create({
      email,
      name,
      password,
      username,
    });

    await this.usersRepository.save(user);
  }

  async remove(req: AuthMiddlewareRequest): Promise<void> {
    const { user: userFromJwt } = req;

    // check if user exists
    const user = await this.findOne({ id: userFromJwt.id });

    await this.usersRepository.delete(user.id);
  }

  // CAUTION: this function returns the user WITH PASSWORD
  // it is used by the AuthService login
  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException(`O campo email é obrigatório`);
    }

    email = email.toLowerCase();

    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  removeUnwantedFields(user: User): User {
    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return user;
  }
}
