import { Category } from '@/modules/category/category.model';

interface StateInterface {
  categories: { [key: string]: Category };
}

const state: StateInterface = {
  categories: {},
};

export const moduleCategory = {
  namespaced: true,
  state,
  mutations: {
    setCategories(state: StateInterface, categories: { [key: string]: Category }) {
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
