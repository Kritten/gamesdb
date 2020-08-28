import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class InputCollectionFilter {
  field: string;
  value: string;
  operator: string;
}

@InputType()
export class InputCollection {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  count: number;

  sortBy: string;

  sortDesc: boolean;

  filters?: InputCollectionFilter[];
}
