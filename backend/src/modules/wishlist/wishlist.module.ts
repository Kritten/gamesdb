import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistResolver } from './wishlist.resolver';
import { WishlistEntityService } from './wishlist.entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistResolver, WishlistEntityService],
  exports: [WishlistEntityService],
})
export class WishlistModule {}
