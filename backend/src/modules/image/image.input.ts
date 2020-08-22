import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class ImageInput {
  @Field(() => ID)
  id?: number;

  name: string;

  link: string;

  @Field(() => [ID])
  games?: number[];
}

@InputType()
export class UpdateImageInput extends PartialType(ImageInput) {
  @Field(() => ID)
  id: number;
}
