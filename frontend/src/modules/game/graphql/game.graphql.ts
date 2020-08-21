import gql from 'graphql-tag';

export const queryPageGame = gql`
  query games($page: Int!, $count: Int!, $sortBy: String!, $sortDesc: Boolean!) {
    games(gameData: { page: $page, count: $count, sortBy: $sortBy, sortDesc: $sortDesc }) {
      id
      name
      description
      countPlayersMin
      countPlayersMax
      minutesPlaytimeMin
      minutesPlaytimeMax
      isCoop
      complexity
      size
      universes {
        id
      }
      categories {
        id
      }
      mechanisms {
        id
      }
      moods {
        id
      }
      images {
        id
      }
      playableWith {
        id
      }
      isExpansionOf {
        id
      }
      expansions {
        id
      }
      ratings {
        id
      }
      #      sessions: Session[];
    }
  }
`;
