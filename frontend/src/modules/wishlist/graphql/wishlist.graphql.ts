import gql from 'graphql-tag';
import { fragments } from './wishlist.fragments';

export const queryPageWishlist = gql`
  query wishlists(
    $page: Int!
    $count: Int
    $sortBy: [String!]!
    $sortDesc: [Boolean!]!
    $filters: [InputCollectionFilter!]!
  ) {
    wishlists(
      wishlistData: {
        page: $page
        count: $count
        sortBy: $sortBy
        sortDesc: $sortDesc
        filters: $filters
      }
    ) {
      count
      items {
        ...wishlist
      }
    }
  }
  ${fragments.wishlist}
`;

export const queryWishlistItem = gql`
  query wishlist($id: ID!) {
    wishlist(id: $id) {
      ...wishlist
    }
  }
  ${fragments.wishlist}
`;
/**
 * Create
 */
export const mutationCreateWishlist = gql`
  mutation createWishlist($wishlist: WishlistInput!) {
    createWishlist(wishlistData: $wishlist) {
      ...wishlist
    }
  }
  ${fragments.wishlist}
`;
/**
 * Update
 */
export const mutationUpdateWishlist = gql`
  mutation updateWishlist($wishlist: UpdateWishlistInput!) {
    updateWishlist(wishlistData: $wishlist) {
      ...wishlist
    }
  }
  ${fragments.wishlist}
`;
/**
 * Delete
 */
export const mutationDeleteWishlist = gql`
  mutation deleteWishlist($id: ID!) {
    deleteWishlist(id: $id)
  }
`;
