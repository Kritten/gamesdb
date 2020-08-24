import { computed, ref } from 'vue';
import { Game } from '@/modules/game/game.model';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export function useCollection(
  entity: Entity,
  service: any,
  {
    page = 1,
    countPerPage = 10,
    sortBy = 'name',
    sortDesc = false,
  }: { page?: number; countPerPage?: number; sortBy?: string; sortDesc?: boolean } = {},
) {
  const items = ref<typeof entity[]>([]);
  const countItems = ref(-1);

  const hasNextPage = computed(() => countItems.value !== items.value.length);

  const loadNextItems = async () => {
    return service
      .loadPage({
        page,
        count: countPerPage,
        sortBy,
        sortDesc,
      })
      .then(({ count, items: itemsLocal }: { count: number; items: Game[] }) => {
        countItems.value = count;
        items.value = items.value.concat(itemsLocal);
        //TODO add isLoading variable to prevent multiple loadings
        page += 1;
      });
  };

  loadNextItems().then();

  return {
    items,
    countItems,
    hasNextPage,
    loadNextItems,
  };
}
