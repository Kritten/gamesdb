import gql from 'graphql-tag';

export const fragments = {
  game: gql`
    fragment game on Game {
      id
      name
      description
      countPlayersMin
      countPlayersMax
      minutesPlaytimeMin
      minutesPlaytimeMax
      isCoop
      isDigital
      complexity
      size
      ratingAverage
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
        name
        link
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
    }
  `,
};
