import gql from 'graphql-tag';

export const queryPlayers = gql`
    query {
        players {
            id
            name
            lastSession
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
            lastSession
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
            lastSession
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
