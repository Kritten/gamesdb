import gql from 'graphql-tag';

export const queryUniverses = gql`
  query {
    universes {
      id
      name
    }
  }
`;
/**
 * Create
 */
export const mutationCreateUniverse = gql`
  mutation createUniverse($universe: UniverseInput!) {
    createUniverse(universeData: $universe) {
      id
      name
    }
  }
`;
/**
 * Update
 */
export const mutationUpdateUniverse = gql`
  mutation updateUniverse($universe: UpdateUniverseInput!) {
    updateUniverse(universeData: $universe) {
      id
      name
    }
  }
`;
/**
 * Delete
 */
export const mutationDeleteUniverse = gql`
  mutation deleteUniverse($id: Int!) {
    deleteUniverse(id: $id)
  }
`;
