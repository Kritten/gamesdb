import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import {
  mutationCreateCategory,
  mutationDeleteCategory,
  mutationUpdateCategory,
} from '@/modules/category/graphql/category.graphql';
import { Category } from '@/modules/category/category.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';

class ServiceCategoryClass implements ServiceEntityInterface<Category> {
  useCreate() {
    const category = ref(new Category());

    return {
      entity: category,
      create: async () => {
        const categoryNew = await this.create(category.value);
        category.value = new Category();
        return categoryNew;
      },
    };
  }

  useUpdate(categoryPassed: Category) {
    const category = ref(cloneDeep(categoryPassed));

    return {
      entity: category,
      update: async () => {
        category.value = cloneDeep(await this.update(category.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (category: Category) => this.delete(category),
    };
  }

  async create(category: Category) {
    const { mutate } = useMutation(mutationCreateCategory);

    const response = await mutate({
      variables: {
        category,
      },
    });

    const categoryNew = (await Category.parseFromServer(response.data.createCategory)) as Category;
    store.commit('moduleCategory/addCategory', categoryNew);

    return categoryNew;
  }

  async update(category: Category) {
    const { mutate } = useMutation(mutationUpdateCategory);

    const response = await mutate({
      variables: {
        category,
      },
    });

    const categoryNew = (await Category.parseFromServer(response.data.updateCategory)) as Category;
    store.commit('moduleCategory/addCategory', categoryNew);

    return categoryNew;
  }

  async delete(category: Category) {
    const { mutate } = useMutation(mutationDeleteCategory);

    const response = await mutate({
      variables: {
        id: category.id,
      },
    });

    store.commit('moduleCategory/deleteCategory', category);

    return response.data.deleteCategory;
  }
}

export const ServiceCategory = new ServiceCategoryClass();
