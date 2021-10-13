import { forwardRef, Module } from '@nestjs/common';
import { RatingResolver } from './rating.resolver';
import { GameModule } from '../game/game.module';
import { PlayerModule } from '../player/player.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    forwardRef(() => GameModule),
    forwardRef(() => PlayerModule),
    CollectionModule,
  ],
  providers: [RatingResolver],
})
export class RatingModule {}
