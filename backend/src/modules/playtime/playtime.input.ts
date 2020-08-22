import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class PlaytimeInput {
  @Field(() => ID)
  id?: number;

  start: Date;

  end: Date;

  @Field(() => ID)
  session: number;
}

@InputType()
export class UpdatePlaytimeInput extends PartialType(PlaytimeInput) {
  @Field(() => ID)
  id: number;
}
