import gql from 'graphql-tag';

export const queryMechanisms = gql`
  query {
    mechanisms {
      id
      name
    }
  }
`;
/**
 * Create
 */
export const mutationCreateMechanism = gql`
  mutation createMechanism($mechanism: MechanismInput!) {
    createMechanism(mechanismData: $mechanism) {
      id
      name
    }
  }
`;
/**
 * Update
 */
export const mutationUpdateMechanism = gql`
  mutation updateMechanism($mechanism: UpdateMechanismInput!) {
    updateMechanism(mechanismData: $mechanism) {
      id
      name
    }
  }
`;
/**
 * Delete
 */
export const mutationDeleteMechanism = gql`
  mutation deleteMechanism($id: ID!) {
    deleteMechanism(id: $id)
  }
`;
