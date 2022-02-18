import gql from 'graphql-tag';

export const fragments = {
    rating: gql`
        fragment rating on Rating {
            id
            player {
                id
            }
            game {
                id
                name
            }
            rating
        }
    `,
};
