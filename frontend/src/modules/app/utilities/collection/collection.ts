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

  const hasNextPage = computed(() => countItems.value !== items.value.length);

  const loadNextItems = async () => {
    return service
      .loadPage({
        page,
        count,
        sortBy,
        sortDesc,
        filters,
      })
      .then(({ count: countLocal, items: itemsLocal }: { count: number; items: T[] }) => {
        countItems.value = countLocal;
        // @ts-ignore
        items.value = items.value.concat(itemsLocal);
        //TODO add isLoading variable to prevent multiple loadings when pressing button multiple times
        page += 1;
      });
  };

  watch(filters, value => {
    console.warn(value, 'value');
    reset();
  });

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
