import { computed, ref, watch } from 'vue';
import {
  InputCollectionData,
  ServiceCollectionLoadPageType,
} from '@/modules/app/utilities/collection/collection.types';
import { debounce } from 'lodash';

export function useCollection<T>(
  loadPage: ServiceCollectionLoadPageType<T>,
  {
    page = 1,
    count = 10,
    sortBy = 'entity.name',
    sortDesc = false,
    filters = ref({}).value,
  }: Partial<InputCollectionData> = {},
  payload?: unknown,
) {
  const items = ref<T[]>([]);
  const countItems = ref(-1);
  const isLoading = ref(false);
  let counterRequests = 0;

  const hasNextPage = computed(() => countItems.value !== items.value.length);

  const loadNextItemsInternal = async (counter: number) => {
    isLoading.value = true;

    const response = await loadPage(
      {
        page,
        count,
        sortBy,
        sortDesc,
        filters: Object.values(filters),
      },
      payload,
    );

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
    resetDebounced();
  });

  const reset = () => {
    items.value = [];
    countItems.value = -1;
    page = 1;
    loadNextItems();
  };

  const resetDebounced = debounce(() => {
    reset();
  }, 500);

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
