import { computed, ref, watch } from 'vue';
import {
  InputCollectionData,
  ServiceCollectionFilters,
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
    filters = ref<ServiceCollectionFilters>({}),
    leftJoins = [],
  }: Partial<InputCollectionData> = {},
  {
    payload,
    immediate = true,
    watchFilters = true,
    prependValues = false,
  }: {
    payload?: unknown;
    immediate?: boolean;
    watchFilters?: boolean;
    prependValues?: boolean;
  } = {},
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
        filters: Object.values(filters.value),
        leftJoins,
      },
      payload,
    );

    if (counter < counterRequests) {
      return;
    }

    countItems.value = response.count;
    if (prependValues) {
      // @ts-ignore
      items.value = response.items.concat(items.value);
    } else {
      // @ts-ignore
      items.value = items.value.concat(response.items);
    }
    page += 1;

    isLoading.value = false;

    return response;
  };

  const loadNextItems = async () => {
    counterRequests += 1;
    return loadNextItemsInternal(counterRequests);
  };

  if (watchFilters) {
    watch(
      filters,
      value => {
        console.warn('CALLED WATCH FILTERS, check if used');
        resetDebounced();
      },
      { deep: true },
    );
  }

  const reset = () => {
    items.value = [];
    countItems.value = -1;
    page = 1;
    loadNextItems();
  };

  const resetDebounced = debounce(() => {
    reset();
  }, 500);

  if (immediate) {
    loadNextItems();
  }

  return {
    items,
    countItems,
    hasNextPage,
    isLoading,
    loadNextItems,
    reset,
    resetDebounced,
  };
}
