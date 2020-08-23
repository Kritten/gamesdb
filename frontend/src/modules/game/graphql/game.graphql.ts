import gql from 'graphql-tag';
import { fragments } from '@/modules/game/graphql/game.fragments';

export const queryPageGame = gql`
  query games($page: Int!, $count: Int!, $sortBy: String!, $sortDesc: Boolean!) {
    games(gameData: { page: $page, count: $count, sortBy: $sortBy, sortDesc: $sortDesc }) {
      count
      items {
        ...game
      }
    }
  }
  ${fragments.game}
`;

export const queryGame = gql`
  query game($id: ID!) {
    game(id: $id) {
      ...game
    }
  }
  ${fragments.game}
`;
