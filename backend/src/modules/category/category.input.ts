import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field(() => ID)
  id?: string;

  name: string;

  @Field(() => [ID])
  games?: string[];
}

@InputType()
export class UpdateCategoryInput extends PartialType(CategoryInput) {
  @Field(() => ID)
  id: string;
}
