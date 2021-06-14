import { baseUseDeleteEntity } from '@/modules/app/base/composables/baseUseDeleteEntity';
import { Category } from '@/modules/category/category.model';
import { useCategory } from '@/modules/category/composables/useCategory';
import { mutationDeleteCategory } from '@/modules/category/graphql/category.graphql';

export const useDeleteCategory = () => {
  const useDeleteEntity = baseUseDeleteEntity<Category, { deleteCategory: Category }>({
    deleteEntity: useCategory().deleteCategory,
    mutation: mutationDeleteCategory,
  });

  return {
    ...useDeleteEntity,
  };
};
