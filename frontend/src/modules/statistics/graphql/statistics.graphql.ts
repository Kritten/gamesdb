import gql from 'graphql-tag';

export const queryStatisticsCounts = gql`
    query statisticsCounts {
        statisticsCounts {
            gamesAnalog
            gamesDigital
            ratings
            wishlists
        }
    }
`;

export const queryStatisticsGamesCountPlayed = gql`
    query statisticsGamesCountPlayed(
        $page: Int!
        $count: Int
        $sortBy: [String!]!
        $sortDesc: [Boolean!]!
        $filters: [InputCollectionFilter!]!
    ) {
        statisticsGamesCountPlayed(
            statisticsData: {
                page: $page
                count: $count
                sortBy: $sortBy
                sortDesc: $sortDesc
                filters: $filters
            }
        ) {
            count
            items {
                id
                countPlayed
            }
        }
    }
`;

export const queryStatisticsGamesLastPlayed = gql`
    query statisticsGamesLastPlayed(
        $page: Int!
        $count: Int
        $sortBy: [String!]!
        $sortDesc: [Boolean!]!
        $filters: [InputCollectionFilter!]!
    ) {
        statisticsGamesLastPlayed(
            statisticsData: {
                page: $page
                count: $count
                sortBy: $sortBy
                sortDesc: $sortDesc
                filters: $filters
            }
        ) {
            count
            items {
                id
                session {
                    id
                    playtimes {
                        end
                    }
                }
            }
        }
    }
`;

export const queryStatisticsGamesTimePlayed = gql`
    query statisticsGamesTimePlayed(
        $page: Int!
        $count: Int
        $sortBy: [String!]!
        $sortDesc: [Boolean!]!
        $filters: [InputCollectionFilter!]!
    ) {
        statisticsGamesTimePlayed(
            statisticsData: {
                page: $page
                count: $count
                sortBy: $sortBy
                sortDesc: $sortDesc
                filters: $filters
            }
        ) {
            count
            items {
                id
                timePlayed
            }
        }
    }
`;

export const QueryStatisticsPlaytimesGroupedByDaytime = gql`
    query statisticsPlaytimesGroupedByDaytime(
        $page: Int!
        $count: Int
        $sortBy: [String!]!
        $sortDesc: [Boolean!]!
        $filters: [InputCollectionFilter!]!
    ) {
        statisticsPlaytimesGroupedByDaytime(
            statisticsData: {
                page: $page
                count: $count
                sortBy: $sortBy
                sortDesc: $sortDesc
                filters: $filters
            }
        ) {
            count
            items {
                data
            }
        }
    }
`;
