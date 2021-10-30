import gql from 'graphql-tag';

export const fragments = {
  game: gql`
    fragment game on Game {
      id
      idBGG
      name
      description
      countPlayersMin
      countPlayersMax
      minutesPlaytimeMin
      minutesPlaytimeMax
      isCoop
      isDigital
      complexity
      ratingBGG
      size
      ratingAverage
      ratingCount
      images
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
