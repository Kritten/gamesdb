import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryEntityService } from './category.entity.service';
import { CategoryResolver } from './category.resolver';
import { GameModule } from '../game/game.module';
import {CollectionModule} from "../../utilities/collection/collection.module";

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => GameModule), forwardRef(() => CollectionModule)],
  providers: [CategoryResolver, CategoryEntityService],
  exports: [CategoryEntityService],
})
export class CategoryModule {}
