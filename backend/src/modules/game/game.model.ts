import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from '../category/category.model';
import { UniverseModel } from '../universe/universe.model';
import { MechanismModel } from '../mechanism/mechanism.model';
import { MoodModel } from '../mood/mood.model';
import { SessionModel } from '../session/session.model';

@ObjectType()
export class GameModel {
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

  @Field(() => UniverseModel)
  universe: UniverseModel;

  @Field(() => [CategoryModel])
  categories: CategoryModel[];

  @Field(() => [MechanismModel])
  mechanisms: MechanismModel[];

  @Field(() => [MoodModel])
  moods: MoodModel[];

  @Field(() => [GameModel])
  playableWith: GameModel[];

  @Field(() => [GameModel])
  isExpansionOf: GameModel;

  @Field(() => [GameModel])
  expansions: GameModel[];

  @Field(() => [SessionModel])
  sessions: SessionModel[];
}
