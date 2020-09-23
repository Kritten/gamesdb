import gql from 'graphql-tag';

export const queryPageImage = gql`
  query images(
    $page: Int!
    $count: Int
    $sortBy: [String!]!
    $sortDesc: [Boolean!]!
    $filters: [InputCollectionFilter!]!
    $leftJoins: [String!]
  ) {
    images(
      imageData: {
        page: $page
        count: $count
        sortBy: $sortBy
        sortDesc: $sortDesc
        filters: $filters
        leftJoins: $leftJoins
      }
    ) {
      count
      items {
        id
        name
        link
      }
    }
  }
`;
/**
 * Create
 */
export const mutationCreateImage = gql`
  mutation createImage($image: ImageInput!) {
    createImage(imageData: $image) {
      id
      name
      link
    }
  }
`;
/**
 * Update
 */
export const mutationUpdateImage = gql`
  mutation updateImage($image: UpdateImageInput!) {
    updateImage(imageData: $image) {
      id
      name
      link
    }
  }
`;
/**
 * Delete
 */
export const mutationDeleteImage = gql`
  mutation deleteImage($id: ID!) {
    deleteImage(id: $id)
  }
`;
