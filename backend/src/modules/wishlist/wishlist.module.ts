import { Module } from '@nestjs/common';
import { WishlistResolver } from './wishlist.resolver';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    CollectionModule,
  ],
  providers: [
    WishlistResolver,
  ],
})
export class WishlistModule {}
