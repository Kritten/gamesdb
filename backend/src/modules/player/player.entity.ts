import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Session } from '../session/session.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Player {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(
    () => Session,
    session => session.players,
  )
  @JoinTable()
  @Field(() => [Session], { defaultValue: [] })
  sessionsPlayed: Session[];

  @ManyToMany(
    () => Session,
    session => session.winners,
  )
  @JoinTable()
  @Field(() => [Session], { defaultValue: [] })
  sessionsWon: Session[];
}
