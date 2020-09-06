import gql from 'graphql-tag';

export const queryStatisticsGamesCountPlayed = gql`
  query statisticsGamesCountPlayed(
    $page: Int!
    $count: Int!
    $sortBy: String!
    $sortDesc: Boolean!
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
    $count: Int!
    $sortBy: String!
    $sortDesc: Boolean!
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
