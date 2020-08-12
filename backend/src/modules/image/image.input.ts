import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class ImageInput {
  @Field(() => Int)
  id?: number;

  name: string;

  link: string;

  @Field(() => [Int])
  games?: number[];
}

@InputType()
export class UpdateImageInput extends PartialType(ImageInput) {
  @Field(() => Int)
  id: number;
}
