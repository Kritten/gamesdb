import { forwardRef, Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { GameModule } from '../game/game.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [forwardRef(() => GameModule), forwardRef(() => CollectionModule)],
  providers: [CategoryResolver],
})
export class CategoryModule {}
