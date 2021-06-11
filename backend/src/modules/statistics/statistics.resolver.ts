import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { InputCollection } from '../../utilities/collection/collection.input';
import { GamesCountPlayedCollectionDataModel } from './models/gamesCountPlayed.collectionData.model';
import { StatisticsService } from './statistics.service';
import { GamesTimePlayedCollectionDataModel } from './models/gamesTimePlayed.collectionData.model';
import { GraphCollectionDataModel } from './models/graph.collectionData.model';
import { GamesBestRatedCollectionDataModel } from './models/gamesBestRated.collectionData.model';
import {CountsModel} from "./models/counts.model";

@Resolver()
export class StatisticsResolver {
  constructor(private statisticsService: StatisticsService) {}

  @Query(() => CountsModel)
  @UseGuards(GqlAuthGuard)
  async statisticsCounts() {
    return this.statisticsService.counts();
  }

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

  @Query(() => GamesBestRatedCollectionDataModel)
  @UseGuards(GqlAuthGuard)
  async statisticsGamesBestRated(
    @Args('statisticsData') data: InputCollection,
  ) {
    return this.statisticsService.gamesBestRated(data);
  }

  @Query(() => GraphCollectionDataModel)
  @UseGuards(GqlAuthGuard)
  async statisticsPlaytimesGroupedByDaytime(
    @Args('statisticsData') data: InputCollection,
  ) {
    return this.statisticsService.playtimesGroupedByDaytime(data);
  }
}
