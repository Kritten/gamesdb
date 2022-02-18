import gql from 'graphql-tag';
import { fragments } from '@/modules/session/graphql/session.fragments';

export const queryPageSession = gql`
    query sessions(
        $page: Int!
        $count: Int
        $sortBy: [String!]!
        $sortDesc: [Boolean!]!
        $filters: [InputCollectionFilter!]!
    ) {
        sessions(
            sessionData: {
                page: $page
                count: $count
                sortBy: $sortBy
                sortDesc: $sortDesc
                filters: $filters
            }
        ) {
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
/**
 * Update
 */
export const mutationUpdateSession = gql`
    mutation updateSession($session: UpdateSessionInput!) {
        updateSession(sessionData: $session) {
            ...session
        }
    }
    ${fragments.session}
`;
/**
 * Delete
 */
export const mutationDeleteSession = gql`
    mutation deleteSession($id: ID!) {
        deleteSession(id: $id)
    }
`;
