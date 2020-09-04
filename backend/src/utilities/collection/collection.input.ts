import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class InputCollectionFilter {
  field: string;
  @Field(() => Int)
  valueInt?: number;
  @Field(() => Float)
  valueFloat?: number;
  valueBoolean?: boolean;
  valueString?: string;
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

  filters: InputCollectionFilter[];
}
