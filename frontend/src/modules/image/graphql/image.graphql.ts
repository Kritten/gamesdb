import gql from 'graphql-tag';

export const queryImages = gql`
  query {
    images {
      id
      name
      link
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
  mutation deleteImage($id: Int!) {
    deleteImage(id: $id)
  }
`;
