import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { GameModule } from '../game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => GameModule)],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
