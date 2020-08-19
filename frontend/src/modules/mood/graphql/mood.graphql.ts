import gql from 'graphql-tag';

export const queryMoods = gql`
  query {
    moods {
      id
      name
    }
  }
`;
/**
 * Create
 */
export const mutationCreateMood = gql`
  mutation createMood($mood: MoodInput!) {
    createMood(moodData: $mood) {
      id
      name
    }
  }
`;
/**
 * Update
 */
export const mutationUpdateMood = gql`
  mutation updateMood($mood: UpdateMoodInput!) {
    updateMood(moodData: $mood) {
      id
      name
    }
  }
`;
/**
 * Delete
 */
export const mutationDeleteMood = gql`
  mutation deleteMood($id: Int!) {
    deleteMood(id: $id)
  }
`;
