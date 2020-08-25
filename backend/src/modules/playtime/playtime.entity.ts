import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ManyToOne } from 'typeorm/index';
import { Session } from '../session/session.entity';

@Entity()
@ObjectType()
export class Playtime {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'datetime',
  })
  @Field(() => GraphQLISODateTime)
  start: Date;

  @Column({
    type: 'datetime',
  })
  @Field(() => GraphQLISODateTime)
  end: Date;

  @ManyToOne(
    () => Session,
    session => session.playtimes,
    { onDelete: 'CASCADE' },
  )
  @Field(() => Session)
  session: Session;
}
