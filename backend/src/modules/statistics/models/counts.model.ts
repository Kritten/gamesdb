import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountsModel {
  gamesDigital: number
  gamesAnalog: number
  ratings: number
  wishlists: number
}
