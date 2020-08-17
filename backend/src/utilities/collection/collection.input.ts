import { InputType } from '@nestjs/graphql';

@InputType()
export class InputCollection {
  page: number;

  count: number;

  sortBy: string;

  sortDesc: boolean;
}
