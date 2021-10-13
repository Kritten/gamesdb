import { forwardRef, Module } from '@nestjs/common';
import { UniverseResolver } from './universe.resolver';
import { GameModule } from '../game/game.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [forwardRef(() => GameModule), CollectionModule],
  providers: [UniverseResolver],
})
export class UniverseModule {}
