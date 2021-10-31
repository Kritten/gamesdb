import {Field, Float, ID, InputType, Int, PartialType} from '@nestjs/graphql';
import {InputDatabaseRelation, Modify} from "../../utilities/types";

@InputType()
export class GameInput {
  name: string;

  description?: string;

  @Field(() => Int)
  idBGG?: number;

  @Field(() => Float)
  ratingBGG?: number;

  @Field(() => Int)
  countPlayersMin?: number;

  @Field(() => Int)
  countPlayersMax?: number;

  @Field(() => Int)
  minutesPlaytimeMin?: number;

  @Field(() => Int)
  minutesPlaytimeMax?: number;

  isCoop?: boolean;

  isDigital?: boolean;

  @Field(() => Int)
  complexity?: number;

  @Field(() => Int)
  size?: number;

  @Field(() => [ID])
  universes?: string[];

  @Field(() => [ID])
  categories?: string[];

  @Field(() => [ID])
  mechanisms?: string[];

  @Field(() => [ID])
  moods?: string[];

  @Field(() => String)
  images?: string;

  @Field(() => [ID])
  ratings?: string[];

  @Field(() => [ID])
  playableWith?: string[];

  @Field(() => ID)
  isExpansionOf?: string;

  @Field(() => [ID])
  expansions?: string[];
}

@InputType()
export class UpdateGameInput extends PartialType(GameInput) {
  @Field(() => ID)
  id: string;
}

export type GameInputDatabase = Modify<GameInput, {
  universes: InputDatabaseRelation,
  categories: InputDatabaseRelation,
  mechanisms: InputDatabaseRelation,
  moods: InputDatabaseRelation,
  // playableWith: InputDatabaseRelation,
  // expansions: InputDatabaseRelation,
}>;

export type GameInputDatabaseUpdate = Modify<UpdateGameInput, {
  universes: InputDatabaseRelation,
  categories: InputDatabaseRelation,
  mechanisms: InputDatabaseRelation,
  moods: InputDatabaseRelation,
  // playableWith: InputDatabaseRelation,
  // expansions: InputDatabaseRelation,
}>;
