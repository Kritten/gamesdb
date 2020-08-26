import gql from 'graphql-tag';

export const fragments = {
  session: gql`
    fragment session on Session {
      id
      players {
        id
      }
      playtimes {
        id
        start
        end
      }
      winners {
        id
      }
      game {
        id
      }
    }
  `,
};