import gql from 'graphql-tag';

export const queryStatisticsCounts = gql`
    query statisticsCounts {
      statisticsCounts {
        gamesAnalog
        gamesDigital
        ratings
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
        name
        countPlayed
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
        name
        timePlayed
      }
    }
  }
`;

export const queryStatisticsGamesBestRated = gql`
  query statisticsGamesBestRated(
    $page: Int!
    $count: Int
    $sortBy: [String!]!
    $sortDesc: [Boolean!]!
    $filters: [InputCollectionFilter!]!
  ) {
    statisticsGamesBestRated(
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
        name
        rating
        count
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
