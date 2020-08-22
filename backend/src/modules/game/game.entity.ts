import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Mechanism } from '../mechanism/mechanism.entity';
import { Mood } from '../mood/mood.entity';
import { Universe } from '../universe/universe.entity';
import { Session } from '../session/session.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Rating } from '../rating/rating.entity';
import { Image } from '../image/image.entity';

@Entity()
@ObjectType()
export class Game {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  @Field(() => Int)
  countPlayersMin?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  @Field(() => Int)
  countPlayersMax?: number;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  @Field(() => Int)
  minutesPlaytimeMin?: number;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  @Field(() => Int)
  minutesPlaytimeMax?: number;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  isCoop?: boolean;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  @Field(() => Int)
  complexity?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  @Field(() => Int)
  size?: number;

  @ManyToMany(
    () => Universe,
    universe => universe.games,
  )
  @JoinTable()
  @Field(() => [Universe], { defaultValue: [] })
  universes: Universe[];

  @ManyToMany(
    () => Category,
    category => category.games,
  )
  @JoinTable()
  @Field(() => [Category], { defaultValue: [] })
  categories: Category[];

  @ManyToMany(
    () => Mechanism,
    mechanism => mechanism.games,
  )
  @JoinTable()
  @Field(() => [Mechanism], { defaultValue: [] })
  mechanisms: Mechanism[];

  @ManyToMany(
    () => Mood,
    mood => mood.games,
  )
  @JoinTable()
  @Field(() => [Mood], { defaultValue: [] })
  moods: Mood[];

  @ManyToMany(
    () => Image,
    image => image.games,
  )
  @JoinTable()
  @Field(() => [Image], { defaultValue: [] })
  images: Image[];

  @ManyToMany(() => Game)
  @JoinTable()
  @Field(() => [Game], { defaultValue: [] })
  playableWith: Game[];

  @ManyToOne(
    () => Game,
    game => game.expansions,
  )
  @JoinTable()
  @Field(() => Game, { nullable: true })
  isExpansionOf: Game;

  @OneToMany(
    () => Game,
    game => game.isExpansionOf,
  )
  @JoinTable()
  @Field(() => [Game], { defaultValue: [] })
  expansions: Game[];

  @OneToMany(
    () => Rating,
    rating => rating.game,
  )
  @Field(() => [Rating], { defaultValue: [] })
  ratings: Rating[];

  @OneToMany(
    () => Session,
    session => session.game,
  )
  @JoinTable()
  @Field(() => [Session], { defaultValue: [] })
  sessions: Session[];
}
