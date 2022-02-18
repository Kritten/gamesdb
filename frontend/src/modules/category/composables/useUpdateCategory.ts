import { baseUseUpdateEntity } from '@/modules/app/base/composables/baseUseUpdateEntity';
import { Category } from '@/modules/category/category.model';
import { useCategory } from '@/modules/category/composables/useCategory';
import { mutationUpdateCategory } from '@/modules/category/graphql/category.graphql';

export const useUpdateCategory = (categoryPassed: Category) => {
    const useUpdateEntity = baseUseUpdateEntity<
        Category,
        { updateCategory: Category }
    >({
        cls: Category,
        entityPassed: categoryPassed,
        setEntity: useCategory().setCategory,
        mutation: mutationUpdateCategory,
        nameMutation: 'updateCategory',
        nameVariable: 'category',
    });

    return {
        ...useUpdateEntity,
    };
};
