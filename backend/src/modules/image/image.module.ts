import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from '../game/game.module';
import { Image } from './image.entity';
import { ImageResolver } from './image.resolver';
import { ImageEntityService } from './image.entity.service';
import { ImageCollectionService } from './collection/image.collection.service';
import { WishlistModule } from '../wishlist/wishlist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    forwardRef(() => GameModule),
    forwardRef(() => WishlistModule),
  ],
  providers: [ImageResolver, ImageEntityService, ImageCollectionService],
  exports: [ImageEntityService],
})
export class ImageModule {}
