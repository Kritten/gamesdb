import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field(() => ID)
  id?: number;

  name: string;

  @Field(() => [ID])
  games?: number[];
}

@InputType()
export class UpdateCategoryInput extends PartialType(CategoryInput) {
  @Field(() => ID)
  id: number;
}
