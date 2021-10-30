import { Category } from '../category/category.entity';
import { Mechanism } from '../mechanism/mechanism.entity';
import { Mood } from '../mood/mood.entity';
import { Universe } from '../universe/universe.entity';
import { Session } from '../session/session.entity';
import {Field, Float, ID, Int, ObjectType} from '@nestjs/graphql';
import { Rating } from '../rating/rating.entity';

@ObjectType()
export class Game {
  @Field(() => ID)
  id: number;

  name: string;

  @Field(() => Int)
  idBGG?: number;

  @Field(() => Float)
  ratingBGG?: number;

  description?: string;

  @Field(() => Int)
  countPlayersMin?: number;

  @Field(() => Int)
  countPlayersMax?: number;

  @Field(() => Int)
  minutesPlaytimeMin?: number;

  @Field(() => Int)
  minutesPlaytimeMax?: number;

  isCoop?: boolean;

  isDigital: boolean;

  @Field(() => Int)
  complexity?: number;

  @Field(() => Int)
  size?: number;

  images: string;

  @Field(() => [Universe], { defaultValue: [] })
  universes: Universe[];

  @Field(() => [Category], { defaultValue: [] })
  categories: Category[];

  @Field(() => [Mechanism], { defaultValue: [] })
  mechanisms: Mechanism[];

  @Field(() => [Mood], { defaultValue: [] })
  moods: Mood[];

  @Field(() => [Game], { defaultValue: [] })
  playableWith: Game[];

  @Field(() => Game, { nullable: true })
  isExpansionOf: Game;

  @Field(() => [Game], { defaultValue: [] })
  expansions: Game[];

  @Field(() => [Rating], { defaultValue: [] })
  ratings: Rating[];

  @Field(() => [Session], { defaultValue: [] })
  sessions: Session[];

  public ratingAverage?: number | null;
  public ratingCount?: number | null;

  // @AfterLoad()
  // public async calculateRatingAverage() {
  //   const rating = await getConnection().query(`
  //     select
  //       Avg(rating.rating) as rating
  //     from
  //       game
  //     left join
  //         rating
  //         on rating.gameId = game.id
  //     where game.id = ${this.id}
  //   `);
  //
  //   this.ratingAverage = rating[0].rating;
  // }
}
