import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../category/category.type';
import { UniverseType } from '../universe/universe.type';
import { MechanismType } from '../mechanism/mechanism.type';
import { MoodType } from '../mood/mood.type';
import { SessionType } from '../session/session.type';

@ObjectType()
export class GameType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  countPlayersMin: number;

  @Field(() => Int)
  countPlayersMax: number;

  @Field(() => Int)
  minutesPlaytimeMin: number;

  @Field(() => Int)
  minutesPlaytimeMax: number;

  @Field()
  isCoop: boolean;

  @Field(() => Int)
  complexity: number;

  @Field(() => Int)
  size: number;

  @Field(() => UniverseType)
  universe: UniverseType;

  @Field(() => [CategoryType])
  categories: CategoryType[];

  @Field(() => [MechanismType])
  mechanisms: MechanismType[];

  @Field(() => [MoodType])
  moods: MoodType[];

  @Field(() => [GameType])
  playableWith: GameType[];

  @Field(() => [GameType])
  isExpansionOf: GameType;

  @Field(() => [GameType])
  expansions: GameType[];

  @Field(() => [SessionType])
  sessions: SessionType[];
}
