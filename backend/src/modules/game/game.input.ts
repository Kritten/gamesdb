import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class GameInput {
  @Field(() => ID)
  id?: string;

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

  @Field(() => [ID])
  universes?: string[];

  @Field(() => [ID])
  categories?: string[];

  @Field(() => [ID])
  mechanisms?: string[];

  @Field(() => [ID])
  moods?: string[];

  @Field(() => [ID])
  images?: string[];

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
