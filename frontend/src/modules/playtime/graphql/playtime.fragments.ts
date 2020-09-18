import gql from 'graphql-tag';

export const fragments = {
  playtime: gql`
    fragment playtime on Playtime {
      id
      start
      end
    }
  `,
};
