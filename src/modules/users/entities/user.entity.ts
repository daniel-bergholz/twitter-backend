import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Tweet } from 'src/modules/tweets/entities/tweet.entity';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ nullable: true, default: null })
  @Column({ default: null })
  bio: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ isArray: true, type: Tweet })
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  number_of_followers: number;

  @ApiProperty()
  number_of_follows: number;

  @ApiProperty({ isArray: true, type: User })
  @ManyToMany(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  follows: User[];

  @ApiProperty({ isArray: true, type: User })
  @ManyToMany(() => User, (user) => user.follows, { onDelete: 'CASCADE' })
  @JoinTable()
  followers: User[];

  @BeforeUpdate()
  @BeforeInsert()
  async beforeSave() {
    if (this?.name) {
      this.name = this.name.trim();
    }

    if (this?.email) {
      this.email = this.email.toLowerCase().trim();
    }

    if (this?.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }

    if (this?.username) {
      this.username = this.username.trim().replace(' ', '_');
    }
  }

  @AfterLoad()
  sortItems() {
    if (this?.tweets?.length) {
      this.tweets.sort((tweet, nextTweet) =>
        nextTweet.created_at < tweet.created_at ? -1 : 1,
      );
    }

    if (this?.followers?.length) {
      this.number_of_followers = this.followers.length;
    }

    if (this?.follows?.length) {
      this.number_of_follows = this.follows.length;
    }
  }
}
