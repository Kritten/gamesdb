import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class SessionInput {
  @Field(() => Int)
  id?: number;

  start: Date;

  end: Date;

  @Field(() => [Int])
  players?: number[];

  @Field(() => [Int])
  winners?: number[];

  @Field(() => Int)
  game?: number;
}

@InputType()
export class UpdateSessionInput extends PartialType(SessionInput) {
  @Field(() => Int)
  id: number;
}
