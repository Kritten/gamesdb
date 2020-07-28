import {Field, Int, ObjectType} from '@nestjs/graphql';
import { CategoryModel } from '../category/category.model';
import { UniverseModel } from '../universe/universe.model';
import { MechanismModel } from '../mechanism/mechanism.model';
import { MoodModel } from '../mood/mood.model';
import { SessionModel } from '../session/session.model';

@ObjectType()
export class GameModel {
  @Field(() => Int)
  id: number;

  name: string;

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

  @Field(() => Int)
  complexity?: number;

  @Field(() => Int)
  size?: number;

  universe: UniverseModel;

  categories: CategoryModel[];

  mechanisms: MechanismModel[];

  @Field(() => [GameModel], {defaultValue: []})
  moods: MoodModel[];

  @Field(() => [GameModel], {defaultValue: []})
  playableWith: GameModel[];

  @Field(() => [GameModel], {defaultValue: []})
  isExpansionOf: GameModel;

  @Field(() => [GameModel], {defaultValue: []})
  expansions: GameModel[];

  @Field(() => [SessionModel], {defaultValue: []})
  sessions: SessionModel[];
}
