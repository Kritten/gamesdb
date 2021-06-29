import {Field, Float, ID, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class GameInput {
  @Field(() => ID)
  id?: string;

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
