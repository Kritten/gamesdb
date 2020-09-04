import { forwardRef, Module } from '@nestjs/common';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsCollectionService } from './collection/statistics.collection.service';
import { StatisticsService } from './statistics.service';
import { CollectionModule } from '../../utilities/collection/collection.module';

@Module({
  imports: [forwardRef(() => CollectionModule)],
  providers: [
    StatisticsResolver,
    StatisticsService,
    StatisticsCollectionService,
  ],
  exports: [StatisticsService],
})
export class StatisticsModule {}
