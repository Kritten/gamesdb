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
  valueDate?: Date;
  @Field(() => [Float, Float])
  valueRange?: [number, number];
  operator: string;
}

@InputType()
export class InputCollection {
  @Field(() => Int)
  page: number;

  @Field(() => Int, { nullable: true })
  count: number | null;

  sortBy: string[];

  sortDesc: boolean[];

  filters: InputCollectionFilter[];

  @Field(() => [String], { defaultValue: [] })
  leftJoins?: string[];
}
