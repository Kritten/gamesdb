import gql from "graphql-tag";

export const queryUserCurrent = gql`
  query {
    user {
      id
      name
    }
  }
`;
