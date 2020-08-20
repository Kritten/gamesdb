import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class SessionInput {
  @Field(() => Int)
  id?: number;

  @Field(() => [Int])
  players?: number[];

  @Field(() => [Int])
  winners?: number[];

  @Field(() => Int)
  game?: number;

  @Field(() => [Int])
  playtimes?: number[];
}

@InputType()
export class UpdateSessionInput extends PartialType(SessionInput) {
  @Field(() => Int)
  id: number;
}
