import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class GameInput {
  @Field(() => ID)
  id?: number;

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

  @Field()
  isCoop?: boolean;

  @Field(() => Int)
  complexity?: number;

  @Field(() => Int)
  size?: number;

  @Field(() => [ID])
  universes?: number[];

  @Field(() => [ID])
  categories?: number[];

  @Field(() => [ID])
  mechanisms?: number[];

  @Field(() => [ID])
  moods?: number[];

  @Field(() => [ID])
  playableWith?: number[];

  @Field(() => ID)
  isExpansionOf?: number;

  @Field(() => [ID])
  expansions?: number[];
}

@InputType()
export class UpdateGameInput extends PartialType(GameInput) {
  @Field(() => ID)
  id: number;
}
