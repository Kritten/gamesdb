import { forwardRef, Module } from '@nestjs/common';
import { SessionResolver } from './session.resolver';
import { GameModule } from '../game/game.module';
import { PlayerModule } from '../player/player.module';
import { PlaytimeModule } from '../playtime/playtime.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    forwardRef(() => GameModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => PlaytimeModule),
    CollectionModule,
  ],
  providers: [SessionResolver],
})
export class SessionModule {}
