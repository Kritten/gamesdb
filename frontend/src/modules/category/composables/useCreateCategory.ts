import { baseUseCreateEntity } from '@/modules/app/base/composables/baseUseCreateEntity';
import { Category } from '@/modules/category/category.model';
import { useCategory } from '@/modules/category/composables/useCategory';
import { mutationCreateCategory } from '@/modules/category/graphql/category.graphql';

export const useCreateCategory = () => {
  const useCreateEntity = baseUseCreateEntity<Category, { createCategory: Category }>({
    cls: Category,
    setEntity: useCategory().setCategory,
    mutation: mutationCreateCategory,
    nameMutation: 'createCategory',
    nameVariable: 'category',
  });

  return {
    ...useCreateEntity,
  };
};
