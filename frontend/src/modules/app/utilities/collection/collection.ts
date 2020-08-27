import { computed, ref } from 'vue';
import { ServiceCollectionInterface } from '@/modules/app/utilities/collection/collection.types';

export function useCollection<T>(
  service: ServiceCollectionInterface<T>,
  {
    page = 1,
    countPerPage = 10,
    sortBy = 'name',
    sortDesc = false,
    params = {},
  }: {
    page?: number;
    countPerPage?: number;
    sortBy?: string;
    sortDesc?: boolean;
    params?: { [key: string]: any };
  } = {},
) {
  const items = ref<T[]>([]);
  const countItems = ref(-1);

  const hasNextPage = computed(() => countItems.value !== items.value.length);

  const loadNextItems = async () => {
    return service
      .loadPage({
        page,
        count: countPerPage,
        sortBy,
        sortDesc,
        params,
      })
      .then(({ count, items: itemsLocal }: { count: number; items: T[] }) => {
        countItems.value = count;
        // @ts-ignore
        items.value = items.value.concat(itemsLocal);
        //TODO add isLoading variable to prevent multiple loadings when pressing button multiple times
        page += 1;
      });
  };

  const reset = () => {
    items.value = [];
    countItems.value = -1;
    page = 1;
    loadNextItems().then();
  };

  loadNextItems().then();

  return {
    items,
    countItems,
    hasNextPage,
    loadNextItems,
    reset,
  };
}
