import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
class SessionPlaytimeInput {
  start: Date;
  end: Date;
}

@InputType()
export class SessionInput {
  @Field(() => ID)
  id?: number;

  @Field(() => [ID])
  players?: number[];

  @Field(() => [ID])
  winners?: number[];

  @Field(() => ID)
  game?: number;

  @Field(() => [SessionPlaytimeInput])
  playtimes?: SessionPlaytimeInput[];
}

@InputType()
export class UpdateSessionInput extends PartialType(SessionInput) {
  @Field(() => ID)
  id: number;
}
