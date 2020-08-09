import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';
import { GameModule } from '../game/game.module';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating]),
    forwardRef(() => GameModule),
    forwardRef(() => PlayerModule),
  ],
  providers: [RatingResolver, RatingService],
  exports: [RatingService],
})
export class RatingModule {}
