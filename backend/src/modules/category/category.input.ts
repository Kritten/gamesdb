import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field(() => Int)
  id?: number;

  name: string;

  @Field(() => [Int])
  games?: number[];
}

@InputType()
export class UpdateCategoryInput extends PartialType(CategoryInput) {
  @Field(() => Int)
  id: number;
}
