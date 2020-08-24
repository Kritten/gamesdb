import gql from 'graphql-tag';

export const queryRatings = gql`
  query {
    ratings {
      id
      name
    }
  }
`;
/**
 * Create
 */
export const mutationCreateRating = gql`
  mutation createRating($rating: RatingInput!) {
    createRating(ratingData: $rating) {
      id
      name
    }
  }
`;
/**
 * Update
 */
export const mutationUpdateRating = gql`
  mutation updateRating($rating: UpdateRatingInput!) {
    updateRating(ratingData: $rating) {
      id
      name
    }
  }
`;
/**
 * Delete
 */
export const mutationDeleteRating = gql`
  mutation deleteRating($id: ID!) {
    deleteRating(id: $id)
  }
`;
