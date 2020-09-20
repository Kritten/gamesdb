import gql from 'graphql-tag';
import { fragments } from '@/modules/game/graphql/game.fragments';

export const queryPageGame = gql`
  query games(
    $page: Int!
    $count: Int
    $sortBy: [String!]!
    $sortDesc: [Boolean!]!
    $filters: [InputCollectionFilter!]!
  ) {
    games(
      gameData: {
        page: $page
        count: $count
        sortBy: $sortBy
        sortDesc: $sortDesc
        filters: $filters
      }
    ) {
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
/**
 * Create
 */
export const mutationCreateGame = gql`
  mutation createGame($game: GameInput!) {
    createGame(gameData: $game) {
      ...game
    }
  }
  ${fragments.game}
`;
/**
 * Update
 */
export const mutationUpdateGame = gql`
  mutation updateGame($game: UpdateGameInput!) {
    updateGame(gameData: $game) {
      ...game
    }
  }
  ${fragments.game}
`;
/**
 * Delete
 */
export const mutationDeleteGame = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id)
  }
`;
