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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  bio: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  follows: User[];

  @ManyToMany(() => User, (user) => user.follows, { onDelete: 'CASCADE' })
  @JoinTable()
  followers: User[];

  @BeforeUpdate()
  @BeforeInsert()
  trimName() {
    if (this?.name) {
      this.name = this.name.trim();
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  lowercaseEmail() {
    if (this?.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this?.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  @AfterLoad()
  sortItems() {
    if (this?.tweets?.length) {
      this.tweets.sort((tweet, nextTweet) =>
        nextTweet.created_at < tweet.created_at ? -1 : 1,
      );
    }
  }
}
