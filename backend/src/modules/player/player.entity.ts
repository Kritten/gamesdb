import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Session } from '../session/session.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Rating } from '../rating/rating.entity';
import { OneToMany } from 'typeorm/index';

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
  @Field(() => [Session], { defaultValue: [] })
  sessionsPlayed: Session[];

  @ManyToMany(
    () => Session,
    session => session.winners,
  )
  @Field(() => [Session], { defaultValue: [] })
  sessionsWon: Session[];

  @OneToMany(
    () => Rating,
    rating => rating.player,
  )
  @Field(() => [Rating], { defaultValue: [] })
  ratings: Rating[];
}
