import { Category } from '@/modules/category/category.model';

interface StateInterface {
  categories: Category[] | null;
}

export const moduleCategory = {
  namespaced: true,
  state: {
    categories: null,
  },
  mutations: {
    setCategories(state: StateInterface, categories: Category[]) {
      state.categories = categories;
    },
    addCategory(state: StateInterface, category: Category) {
      if (state.categories !== null && category.id !== undefined) {
        state.categories[category.id] = category;
      }
    },
    deleteCategory(state: StateInterface, category: Category) {
      if (state.categories !== null && category.id !== undefined) {
        delete state.categories[category.id];
      }
    },
  },
};
