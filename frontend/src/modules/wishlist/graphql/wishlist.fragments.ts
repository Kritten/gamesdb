import gql from 'graphql-tag';

export const fragments = {
  wishlist: gql`
    fragment wishlist on Wishlist {
      id
      name
      price
      description
      link
      taken
      giftFor
      images
    }
  `,
};
