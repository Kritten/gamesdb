import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from '../game/game.module';
import { Image } from './image.entity';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => GameModule)],
  providers: [ImageResolver, ImageService],
  exports: [ImageService],
})
export class ImageModule {}
