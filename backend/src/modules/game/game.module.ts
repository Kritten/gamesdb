import { forwardRef, Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { CategoryModule } from '../category/category.module';
import { UniverseModule } from '../universe/universe.module';
import { SessionModule } from '../session/session.module';
import { MechanismModule } from '../mechanism/mechanism.module';
import { MoodModule } from '../mood/mood.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    forwardRef(() => UniverseModule),
    forwardRef(() => SessionModule),
    forwardRef(() => MechanismModule),
    forwardRef(() => MoodModule),
    forwardRef(() => CollectionModule),
  ],
  providers: [GameResolver],
})
export class GameModule {}
