import gql from 'graphql-tag';
import { fragments } from './rating.fragments';

export const queryPageRatings = gql`
  query ratings(
    $page: Int!
    $count: Int
    $sortBy: String!
    $sortDesc: Boolean!
    $filters: [InputCollectionFilter!]!
  ) {
    ratings(
      ratingData: {
        page: $page
        count: $count
        sortBy: $sortBy
        sortDesc: $sortDesc
        filters: $filters
      }
    ) {
      count
      items {
        ...rating
      }
    }
  }
  ${fragments.rating}
`;
/**
 * Create
 */
export const mutationCreateRating = gql`
  mutation createRating($rating: RatingInput!) {
    createRating(ratingData: $rating) {
      ...rating
    }
  }
  ${fragments.rating}
`;
/**
 * Update
 */
export const mutationUpdateRating = gql`
  mutation updateRating($rating: UpdateRatingInput!) {
    updateRating(ratingData: $rating) {
      ...rating
    }
  }
  ${fragments.rating}
`;
/**
 * Delete
 */
export const mutationDeleteRating = gql`
  mutation deleteRating($id: ID!) {
    deleteRating(id: $id)
  }
`;
