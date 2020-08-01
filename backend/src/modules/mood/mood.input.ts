import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class MoodInput {
  @Field(() => Int)
  id?: number;

  name: string;

  @Field(() => [Int])
  games?: number[];
}

@InputType()
export class UpdateMoodInput extends PartialType(MoodInput) {
  @Field(() => Int)
  id: number;
}
