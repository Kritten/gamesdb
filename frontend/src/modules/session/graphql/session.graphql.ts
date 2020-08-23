import gql from 'graphql-tag';
import { fragments } from '@/modules/session/graphql/session.fragments';

export const queryPageSession = gql`
  query sessions($page: Int!, $count: Int!, $sortBy: String!, $sortDesc: Boolean!) {
    sessions(sessionData: { page: $page, count: $count, sortBy: $sortBy, sortDesc: $sortDesc }) {
      count
      items {
        ...session
      }
    }
  }
  ${fragments.session}
`;

export const querySession = gql`
  query session($id: ID!) {
    session(id: $id) {
      ...session
    }
  }
  ${fragments.session}
`;
/**
 * Create
 */
export const mutationCreateSession = gql`
  mutation createSession($session: SessionInput!) {
    createSession(sessionData: $session) {
      ...session
    }
  }
  ${fragments.session}
`;
