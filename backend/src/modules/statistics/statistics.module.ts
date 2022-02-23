import { forwardRef, Module } from '@nestjs/common';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { CollectionModule } from '../../utilities/collection/collection.module';
import { SessionModule } from 'src/modules/session/session.module';
import { PlaytimeModule } from 'src/modules/playtime/playtime.module';

@Module({
  imports: [
    forwardRef(() => CollectionModule),
    forwardRef(() => SessionModule),
    forwardRef(() => PlaytimeModule),
  ],
  providers: [StatisticsResolver, StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule { }
