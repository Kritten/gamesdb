import { forwardRef, Module } from '@nestjs/common';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { CollectionModule } from '../../utilities/collection/collection.module';

@Module({
  imports: [forwardRef(() => CollectionModule)],
  providers: [StatisticsResolver, StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
