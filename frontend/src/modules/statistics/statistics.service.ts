import { apolloClient } from '@/vue-apollo';
import {
  queryStatisticsGamesBestRated,
  queryStatisticsGamesCountPlayed,
  queryStatisticsGamesTimePlayed,
} from '@/modules/statistics/graphql/statistics.graphql';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';
import { Playtime } from '@/modules/playtime/playtime.model';
import { ServicePlaytime } from '@/modules/playtime/playtime.service';
import {
  addMonths,
  compareAsc,
  differenceInSeconds,
  eachDayOfInterval,
  endOfDay,
  format,
  parse,
  set,
  startOfDay,
  startOfMonth,
  subMonths,
  subSeconds,
} from 'date-fns';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { GamesCountPlayedItem } from '@backend/src/modules/statistics/collection/gamesCountPlayed.collectionData.model';
import { GamesTimePlayedItem } from '@backend/src/modules/statistics/collection/gamesTimePlayed.collectionData.model';
import { GamesBestRatedItem } from '@backend/src/modules/statistics/collection/gamesBestRated.collectionData.model';

class ServiceStatisticsClass {
  async loadPageStatisticsGamesCountPlayed(data: InputCollection, payload: unknown = {}) {
    const { analogOnly = false, digitalOnly = false } = payload as {
      analogOnly?: boolean;
      digitalOnly?: boolean;
    };

    if (analogOnly) {
      data.filters.push({
        field: 'isDigital',
        valueBoolean: false,
        operator: '=',
      });
    } else if (digitalOnly) {
      data.filters.push({
        field: 'isDigital',
        valueBoolean: true,
        operator: '=',
      });
    }

    return loadPageBase<GamesCountPlayedItem>({
      data,
      query: queryStatisticsGamesCountPlayed,
      parseResult: async response => ({
        count: response.data.statisticsGamesCountPlayed.count,
        items: response.data.statisticsGamesCountPlayed.items,
      }),
    });
  }

  async loadPageStatisticsGamesTimePlayed(data: InputCollection, payload: unknown = {}) {
    const { analogOnly = false, digitalOnly = false } = payload as {
      analogOnly?: boolean;
      digitalOnly?: boolean;
    };

    if (analogOnly) {
      data.filters.push({
        field: 'isDigital',
        valueBoolean: false,
        operator: '=',
      });
    } else if (digitalOnly) {
      data.filters.push({
        field: 'isDigital',
        valueBoolean: true,
        operator: '=',
      });
    }

    return loadPageBase<GamesTimePlayedItem>({
      data,
      query: queryStatisticsGamesTimePlayed,
      parseResult: async response => ({
        count: response.data.statisticsGamesTimePlayed.count,
        items: response.data.statisticsGamesTimePlayed.items,
      }),
    });
  }

  async loadPageStatisticsGamesBestRated(data: InputCollection, payload: unknown = {}) {
    const { analogOnly = false, digitalOnly = false } = payload as {
      analogOnly?: boolean;
      digitalOnly?: boolean;
    };

    if (analogOnly) {
      data.filters.push({
        field: 'isDigital',
        valueBoolean: false,
        operator: '=',
      });
    } else if (digitalOnly) {
      data.filters.push({
        field: 'isDigital',
        valueBoolean: true,
        operator: '=',
      });
    }

    return loadPageBase<GamesBestRatedItem>({
      data,
      query: queryStatisticsGamesBestRated,
      parseResult: async response => ({
        count: response.data.statisticsGamesBestRated.count,
        items: response.data.statisticsGamesBestRated.items,
      }),
    });
  }

  loadPageStatisticsPlaytimesPerDay = async (
    { page, count, sortBy, sortDesc, filters, leftJoins }: InputCollection,
    payload: unknown = {},
  ) => {
    const { endInitial, analogOnly = false, digitalOnly = false } = payload as {
      endInitial: Date;
      analogOnly?: boolean;
      digitalOnly?: boolean;
    };
    let start = startOfMonth(subMonths(endInitial, page));
    let end: Date;

    if (page === 1) {
      end = endOfDay(endInitial);
    } else {
      end = subSeconds(startOfDay(addMonths(start, 1)), 1);
    }

    const filtersPlaytimes = [
      ...filters,
      {
        field: 'start',
        valueDate: start,
        operator: '>=',
      },
      {
        field: 'end',
        valueDate: end,
        operator: page === 1 ? '<=' : '<=',
      },
    ];

    const collectionPlaytimes = await ServicePlaytime.loadPage({
      page: 1,
      sortBy: ['entity.start'],
      sortDesc: [true],
      count: undefined,
      filters: filtersPlaytimes,
      leftJoins,
    });

    const result = this.processPlaytimes(collectionPlaytimes.items);

    const interval = eachDayOfInterval({ start, end })
      .map(date => format(date, 'yyyy-MM-dd HH:mm:ss'))
      .reduce((obj, value) => {
        obj[value] = {
          date: value,
          seconds: 0,
        };
        return obj;
      }, {} as { [key: string]: { date: string; seconds: number } });

    for (let i = 0; i < result.length; i++) {
      const data = result[i];
      interval[data.date].seconds = data.seconds;
    }

    const resultFinal = Object.values(interval).sort((a, b) => a.date.localeCompare(b.date));

    return {
      count: resultFinal.length,
      items: resultFinal,
    };
  };

  processPlaytimes(playtimesRaw: Playtime[]) {
    if (playtimesRaw.length === 0) {
      return [];
    }

    const days: { [key: string]: Playtime[] } = {};

    for (let i = 0; i < playtimesRaw.length; i++) {
      const playtime = playtimesRaw[i];
      // format the date to current timezone
      const key = format(
        set(playtime.start, { hours: 0, minutes: 0, seconds: 0 }),
        'yyyy-MM-dd HH:mm:ss',
      );

      if (days[key] === undefined) {
        days[key] = [playtime];
      } else {
        days[key].push(playtime);
      }
    }
    // console.log(days, 'days');
    const entries = Object.entries(days);
    const result: { date: string; seconds: number }[] = [];

    for (let i = 0; i < entries.length; i++) {
      const [dateString, playtimes] = entries[i];
      // console.log(dateString, 'dateString');
      const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', 0);
      playtimes.sort((playtime1, playtime2) => compareAsc(playtime1.start, playtime2.start));
      // console.log(date, 'date');
      // console.log(playtimes[0].start, 'playtimes[0].start');
      //TODO handle overlapping
      // console.log(differenceInSeconds(playtimes[0].start, date), 'differenceInSeconds');

      let difference = 0;
      for (let j = 0; j < playtimes.length; j++) {
        const playtime = playtimes[j];
        difference += differenceInSeconds(playtime.end, playtime.start);
        // console.log(difference, 'difference');
        // console.log(playtime, 'playtime');
      }
      result.push({
        date: dateString,
        seconds: difference,
      });
    }

    return result;
  }
}

export const ServiceStatistics = new ServiceStatisticsClass();
