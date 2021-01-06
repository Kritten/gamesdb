import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistEntityService } from './wishlist.entity.service';
import { WishlistCollectionService } from './collection/rating.collection.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    forwardRef(() => ImageModule),
  ],
  providers: [
    WishlistResolver,
    WishlistEntityService,
    WishlistCollectionService,
  ],
  exports: [WishlistEntityService],
})
export class WishlistModule {}
