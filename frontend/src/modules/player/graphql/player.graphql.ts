import gql from 'graphql-tag';

export const queryPlayers = gql`
  query {
    players {
      id
      name
    }
  }
`;
/**
 * Create
 */
export const mutationCreatePlayer = gql`
  mutation createPlayer($player: PlayerInput!) {
    createPlayer(playerData: $player) {
      id
      name
    }
  }
`;
/**
 * Update
 */
export const mutationUpdatePlayer = gql`
  mutation updatePlayer($player: UpdatePlayerInput!) {
    updatePlayer(playerData: $player) {
      id
      name
    }
  }
`;
/**
 * Delete
 */
export const mutationDeletePlayer = gql`
  mutation deletePlayer($id: ID!) {
    deletePlayer(id: $id)
  }
`;
