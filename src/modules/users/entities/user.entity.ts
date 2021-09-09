import * as bcrypt from 'bcrypt';
// import { Follow } from 'src/modules/follows/entities/follow.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.followers)
  follows: User[];

  @ManyToMany(() => User, (user) => user.follows)
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
}
