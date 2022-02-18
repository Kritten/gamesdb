import gql from 'graphql-tag';

export const queryCategories = gql`
    query {
        categories {
            id
            name
        }
    }
`;
/**
 * Create
 */
export const mutationCreateCategory = gql`
    mutation createCategory($category: CategoryInput!) {
        createCategory(categoryData: $category) {
            id
            name
        }
    }
`;
/**
 * Update
 */
export const mutationUpdateCategory = gql`
    mutation updateCategory($category: UpdateCategoryInput!) {
        updateCategory(categoryData: $category) {
            id
            name
        }
    }
`;
/**
 * Delete
 */
export const mutationDeleteCategory = gql`
    mutation deleteCategory($id: ID!) {
        deleteCategory(id: $id)
    }
`;
