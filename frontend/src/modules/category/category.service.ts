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

export class ServiceCategory {
  static useCreate() {
    let category = ref(new Category());

    return {
      category,
      create: async () => {
        await ServiceCategory.create(category.value);
        category.value = new Category();
      },
    };
  }

  static useUpdate(categoryPassed: Category) {
    let category = ref(cloneDeep(categoryPassed));

    return {
      category,
      update: async () => {
        category.value = cloneDeep(await ServiceCategory.update(category.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (category: Category) => ServiceCategory.delete(category),
    };
  }

  static async create(category: Category) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateCategory,
      variables: {
        category,
      },
    });

    const categoryNew = Category.parseFromServer(response.data.createCategory);
    store.commit('moduleCategory/addCategory', categoryNew);

    return categoryNew;
  }

  static async update(category: Category) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateCategory,
      variables: {
        category,
      },
    });

    const categoryNew = Category.parseFromServer(response.data.updateCategory);
    store.commit('moduleCategory/addCategory', categoryNew);

    return categoryNew;
  }

  static async delete(category: Category) {
    await apolloClient.mutate({
      mutation: mutationDeleteCategory,
      variables: {
        id: category.id,
      },
    });

    store.commit('moduleCategory/deleteCategory', category);
  }
}
