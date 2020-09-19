import { computed, Ref, ref, watch } from 'vue';
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
    hasNextPage: hasNextPagePassed,
  }: {
    payload?: unknown;
    immediate?: boolean;
    watchFilters?: boolean;
    prependValues?: boolean;
    hasNextPage?: ({
      items,
      countItems,
      inputCollectionData,
    }: {
      items: Ref<T[]>;
      countItems: Ref<number>;
      inputCollectionData: { page: Ref<number> };
    }) => boolean;
  } = {},
) {
  const items = ref<T[]>([]);
  const countItems = ref(-1);
  const isLoading = ref(false);
  const pageRef = ref<number>(page);
  let counterRequests = 0;

  let hasNextPage;
  if (hasNextPagePassed !== undefined) {
    hasNextPage = computed(() =>
      hasNextPagePassed({
        // @ts-ignore
        items,
        countItems,
        inputCollectionData: {
          page: pageRef,
        },
      }),
    );
  } else {
    hasNextPage = computed(() => countItems.value !== items.value.length);
  }

  const loadNextItemsInternal = async (counter: number) => {
    isLoading.value = true;

    const response = await loadPage(
      {
        page: pageRef.value,
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
    pageRef.value += 1;

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
    pageRef.value = 1;
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
