import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
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
    let category = ref(new Category());

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
    let category = ref(cloneDeep(categoryPassed));

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
    const response = await apolloClient.mutate({
      mutation: mutationCreateCategory,
      variables: {
        category,
      },
    });

    const categoryNew = await Category.parseFromServer(response.data.createCategory);
    store.commit('moduleCategory/addCategory', categoryNew);

    return categoryNew;
  }

  async update(category: Category) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateCategory,
      variables: {
        category,
      },
    });

    const categoryNew = await Category.parseFromServer(response.data.updateCategory);
    store.commit('moduleCategory/addCategory', categoryNew);

    return categoryNew;
  }

  async delete(category: Category) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteCategory,
      variables: {
        id: category.id,
      },
    });

    store.commit('moduleCategory/deleteCategory', category);

    return response.data.deleteCategory;
  }
}

export const ServiceCategory = new ServiceCategoryClass();
