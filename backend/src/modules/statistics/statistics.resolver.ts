import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { InputCollection } from '../../utilities/collection/collection.input';
import { GamesCountPlayedCollectionDataModel } from './collection/gamesCountPlayed.collectionData.model';
import { StatisticsService } from './statistics.service';
import { GamesTimePlayedCollectionDataModel } from './collection/gamesTimePlayed.collectionData.model';
import { GraphCollectionDataModel } from './collection/graph.collectionData.model';

@Resolver()
export class StatisticsResolver {
  constructor(private statisticsService: StatisticsService) {}

  @Query(() => GamesCountPlayedCollectionDataModel)
  @UseGuards(GqlAuthGuard)
  async statisticsGamesCountPlayed(
    @Args('statisticsData') data: InputCollection,
  ) {
    return this.statisticsService.gamesCountPlayed(data);
  }

  @Query(() => GamesTimePlayedCollectionDataModel)
  @UseGuards(GqlAuthGuard)
  async statisticsGamesTimePlayed(
    @Args('statisticsData') data: InputCollection,
  ) {
    return this.statisticsService.gamesTimePlayed(data);
  }

  @Query(() => GraphCollectionDataModel)
  @UseGuards(GqlAuthGuard)
  async statisticsPlaytimesGroupedByDaytime(
    @Args('statisticsData') data: InputCollection,
  ) {
    return this.statisticsService.playtimesGroupedByDaytime(data);
  }
}
