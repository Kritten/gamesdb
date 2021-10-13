import { forwardRef, Module } from '@nestjs/common';
import { MoodResolver } from './mood.resolver';
import { GameModule } from '../game/game.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [forwardRef(() => GameModule),
    CollectionModule,],
  providers: [MoodResolver],
})
export class MoodModule {}
