import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryEntityService } from './category.entity.service';
import { CategoryResolver } from './category.resolver';
import { GameModule } from '../game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => GameModule)],
  providers: [CategoryResolver, CategoryEntityService],
  exports: [CategoryEntityService],
})
export class CategoryModule {}
