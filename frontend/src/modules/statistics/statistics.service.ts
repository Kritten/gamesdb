import {
    addMonths,
    compareAsc,
    differenceInSeconds,
    eachDayOfInterval,
    endOfDay,
    format,
    set,
    startOfDay,
    startOfMonth,
    subMonths,
    subSeconds,
} from 'date-fns';
import {
    queryStatisticsGamesCountPlayed,
    queryStatisticsGamesLastPlayed,
    queryStatisticsGamesTimePlayed,
} from '@/modules/statistics/graphql/statistics.graphql';
import { Playtime } from '@/modules/playtime/playtime.model';
import { ServicePlaytime } from '@/modules/playtime/playtime.service';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import {
    InputCollection,
    ServiceCollectionLoadPage,
} from '@/modules/app/utilities/collection/collection.types';
import {
    GamesBestRatedItem,
    GamesBestRatedItemServer,
    GamesCountPlayedItem,
    GamesCountPlayedItemServer,
    GamesLastPlayedItem,
    GamesLastPlayedItemServer,
    GamesTimePlayedItem,
    GamesTimePlayedItemServer,
} from '@/modules/statistics/statistics.types';
import { useGame } from '@/modules/game/composables/useGame';
import { queryPageGame } from '@/modules/game/graphql/game.graphql';
import { Session } from '@/modules/session/session.model';

class ServiceStatisticsClass {
    async loadPageStatisticsGamesLastPlayed(
        data: InputCollection,
        payload: Record<string, unknown> = {}
    ) {
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

        const { get } = useGame();

        return loadPageBase<
            GamesLastPlayedItem,
            {
                statisticsGamesLastPlayed: ServiceCollectionLoadPage<GamesLastPlayedItemServer>;
            }
        >({
            data,
            query: queryStatisticsGamesLastPlayed,
            // eslint-disable-next-line @typescript-eslint/require-await
            parseResult: async (response) => ({
                count: response.statisticsGamesLastPlayed.count,
                items: await Promise.all(
                    response.statisticsGamesLastPlayed.items.map(
                        async (item) => ({
                            game: get(item.id),
                            session: await Session.parseFromServer(
                                item.session
                            ),
                        })
                    )
                ),
            }),
        });
    }

    async loadPageStatisticsGamesCountPlayed(
        data: InputCollection,
        payload: unknown = {}
    ) {
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

        const { get } = useGame();

        return loadPageBase<
            GamesCountPlayedItem,
            {
                statisticsGamesCountPlayed: ServiceCollectionLoadPage<GamesCountPlayedItemServer>;
            }
        >({
            data,
            query: queryStatisticsGamesCountPlayed,
            // eslint-disable-next-line @typescript-eslint/require-await
            parseResult: async (response) => ({
                count: response.statisticsGamesCountPlayed.count,
                items: response.statisticsGamesCountPlayed.items.map(
                    (item) => ({
                        countPlayed: item.countPlayed,
                        game: get(item.id),
                    })
                ),
            }),
        });
    }

    async loadPageStatisticsGamesTimePlayed(
        data: InputCollection,
        payload: unknown = {}
    ) {
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

        const { get } = useGame();

        return loadPageBase<
            GamesTimePlayedItem,
            {
                statisticsGamesTimePlayed: ServiceCollectionLoadPage<GamesTimePlayedItemServer>;
            }
        >({
            data,
            query: queryStatisticsGamesTimePlayed,
            // eslint-disable-next-line @typescript-eslint/require-await
            parseResult: async (response) => ({
                count: response.statisticsGamesTimePlayed.count,
                items: response.statisticsGamesTimePlayed.items.map((item) => ({
                    timePlayed: item.timePlayed,
                    game: get(item.id),
                })),
            }),
        });
    }

    async loadPageStatisticsGamesBestRated(
        data: InputCollection,
        payload: unknown = {}
    ) {
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

        const { get } = useGame();

        return loadPageBase<
            GamesBestRatedItem,
            { games: ServiceCollectionLoadPage<GamesBestRatedItemServer> }
        >({
            data,
            query: queryPageGame,
            // eslint-disable-next-line @typescript-eslint/require-await
            parseResult: async (response) => ({
                count: response.games.count,
                items: response.games.items.map((item) => ({
                    game: get(item.id),
                })),
            }),
        });
    }

    loadPageStatisticsPlaytimesPerDay = async (
        { page, filters, leftJoins }: InputCollection,
        payload: unknown = {}
    ) => {
        const { endInitial } = payload as {
            endInitial: Date;
            analogOnly?: boolean;
            digitalOnly?: boolean;
        };
        const start = startOfMonth(subMonths(endInitial, page));
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
            count: null,
            filters: filtersPlaytimes,
            leftJoins,
        });

        const result = this.processPlaytimes(collectionPlaytimes.items);

        const interval = eachDayOfInterval({ start, end })
            .map((date) => format(date, 'yyyy-MM-dd HH:mm:ss'))
            .reduce((obj, value) => {
                obj[value] = {
                    date: value,
                    seconds: 0,
                };
                return obj;
            }, {} as { [key: string]: { date: string; seconds: number } });

        for (let i = 0; i < result.length; i += 1) {
            const data = result[i];
            interval[data.date].seconds = data.seconds;
        }

        const resultFinal = Object.values(interval).sort((a, b) =>
            a.date.localeCompare(b.date)
        );

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

        for (let i = 0; i < playtimesRaw.length; i += 1) {
            const playtime = playtimesRaw[i];
            // format the date to current timezone
            const key = format(
                set(playtime.start, { hours: 0, minutes: 0, seconds: 0 }),
                'yyyy-MM-dd HH:mm:ss'
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

        for (let i = 0; i < entries.length; i += 1) {
            const [dateString, playtimes] = entries[i];
            // console.log(dateString, 'dateString');
            playtimes.sort((playtime1, playtime2) =>
                compareAsc(playtime1.start, playtime2.start)
            );
            // console.log(date, 'date');
            // console.log(playtimes[0].start, 'playtimes[0].start');
            // TODO handle overlapping
            // console.log(differenceInSeconds(playtimes[0].start, date), 'differenceInSeconds');

            let difference = 0;
            for (let j = 0; j < playtimes.length; j += 1) {
                const playtime = playtimes[j];
                difference += differenceInSeconds(
                    playtime.end as Date,
                    playtime.start
                );
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
