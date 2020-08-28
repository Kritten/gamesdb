import { computed, ref, watch } from 'vue';
import { ServiceCollectionInterface } from '@/modules/app/utilities/collection/collection.types';
import { InputCollection } from '../../../../../../backend/src/utilities/collection/collection.input';

export function useCollection<T>(
  service: ServiceCollectionInterface<T>,
  {
    page = 1,
    count = 10,
    sortBy = 'name',
    sortDesc = false,
    filters = [],
  }: Partial<InputCollection> = {},
) {
  const items = ref<T[]>([]);
  const countItems = ref(-1);
  const isLoading = ref(false);
  let counterRequests = 0;

  const hasNextPage = computed(() => countItems.value !== items.value.length);

  const loadNextItemsInternal = async (counter: number) => {
    isLoading.value = true;

    const response = await service.loadPage({
      page,
      count,
      sortBy,
      sortDesc,
      filters,
    });

    if (counter < counterRequests) {
      return;
    }

    countItems.value = response.count;
    // @ts-ignore
    items.value = items.value.concat(response.items);
    page += 1;

    isLoading.value = false;

    return response;
  };

  const loadNextItems = async () => {
    counterRequests += 1;
    return loadNextItemsInternal(counterRequests);
  };

  watch(filters, value => {
    reset();
  });

  const reset = () => {
    items.value = [];
    countItems.value = -1;
    page = 1;
    loadNextItems();
  };

  loadNextItems();

  return {
    items,
    countItems,
    hasNextPage,
    isLoading,
    loadNextItems,
    reset,
  };
}
