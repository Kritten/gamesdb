import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class ImageInput {
  @Field(() => ID)
  id?: string;

  name: string;

  link: string;

  @Field(() => [ID])
  games?: string[];

  @Field(() => [ID])
  wishlists?: string[];
}

@InputType()
export class UpdateImageInput extends PartialType(ImageInput) {
  @Field(() => ID)
  id: string;
}
