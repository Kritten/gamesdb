import { computed, Ref, ref, watch } from 'vue';
import {
  InputCollectionData,
  ServiceCollectionFilters,
  ServiceCollectionLoadPageType,
} from '@/modules/app/utilities/collection/collection.types';
import { debounce } from 'lodash';

/**
 * Used for paginated data loading
 * @param {function(data: InputCollection, payload: unknown): Object} loadPage - requests and returns the data
 * @param {Object} data
 * @param {Partial<InputCollectionData>} data.inputCollectionData
 * @param {unknown} data.payload
 * @param {boolean} data.immediate
 * @param {boolean} data.watchFilters
 * @param {boolean} data.prependValues
 * @param {function(): boolean} data.hasNextPage
 */
export function useCollection<T>(
  loadPage: ServiceCollectionLoadPageType<T>,
  {
    inputCollectionData = {},
    payload,
    immediate = true,
    watchFilters = true,
    prependValues = false,
    hasNextPage: hasNextPagePassed,
  }: {
    inputCollectionData?: Partial<InputCollectionData>;
    payload?: unknown;
    immediate?: boolean;
    watchFilters?: boolean;
    prependValues?: boolean;
    hasNextPage?: ({
      items,
      countItems,
      page,
      isLoading,
    }: {
      items: Ref<T[]>;
      countItems: Ref<number>;
      page: Ref<number>;
      isLoading: Ref<boolean>;
    }) => boolean;
  } = {},
) {
  const {
    page = 1,
    count = 10,
    sortBy = 'entity.name',
    sortDesc = false,
    filters = ref<ServiceCollectionFilters>({}),
    leftJoins = [],
  } = inputCollectionData;

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
        page: pageRef,
        isLoading,
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
