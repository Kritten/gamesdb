import { computed, ref } from 'vue';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { baseUseEntity } from '@/modules/app/base/composables/baseUseEntity';
import { Category } from '@/modules/category/category.model';

const categories = ref<Record<ID, Category>>({});
const categoriesSortedByLastPlayed = computed(() =>
    Object.values(categories.value).sort((a, b) => a.name.localeCompare(b.name))
);

export const useCategory = () => {
    const useEntity = baseUseEntity<Category>({
        entities: categories,
    });

    return {
        setCategories: useEntity.setEntities,
        setCategory: useEntity.setEntity,
        deleteCategory: useEntity.deleteEntity,

        categories: categoriesSortedByLastPlayed,
        categoryById: (id: ID) => categories.value[id],
    };
};
