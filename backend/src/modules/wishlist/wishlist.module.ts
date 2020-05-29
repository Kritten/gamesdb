import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
})
export class WishlistModule {}
