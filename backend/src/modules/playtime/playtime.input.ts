import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class PlaytimeInput {
  @Field(() => Int)
  id?: number;

  start: Date;

  end: Date;

  @Field(() => Int)
  session: number;
}

@InputType()
export class UpdatePlaytimeInput extends PartialType(PlaytimeInput) {
  @Field(() => Int)
  id: number;
}
