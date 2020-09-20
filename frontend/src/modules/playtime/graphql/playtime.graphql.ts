import gql from 'graphql-tag';
import { fragments } from './playtime.fragments';

export const queryPagePlaytime = gql`
  query playtimes(
    $page: Int!
    $count: Int
    $sortBy: [String!]!
    $sortDesc: [Boolean!]!
    $filters: [InputCollectionFilter!]!
    $leftJoins: [String!]
  ) {
    playtimes(
      playtimeData: {
        page: $page
        count: $count
        sortBy: $sortBy
        sortDesc: $sortDesc
        filters: $filters
        leftJoins: $leftJoins
      }
    ) {
      count
      items {
        ...playtime
      }
    }
  }
  ${fragments.playtime}
`;
