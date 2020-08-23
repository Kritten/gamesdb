import { computed, ref } from 'vue';
import { Game } from '@/modules/game/game.model';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export function useCollection(entity: Entity, service: any, sortByPassed: string = 'name') {
  const items = ref<typeof entity[]>([]);
  const countItems = ref(-1);
  let page = 0;
  let countPerPage = 10;
  let sortBy = sortByPassed;
  let sortDesc = false;

  const hasNextPage = computed(() => countItems.value !== items.value.length);

  const loadNextItems = () => {
    page += 1;

    service
      .loadPage({
        page,
        count: countPerPage,
        sortBy,
        sortDesc,
      })
      .then(({ count, items: itemsLocal }: { count: number; items: Game[] }) => {
        countItems.value = count;
        items.value = items.value.concat(itemsLocal);
      });
  };

  loadNextItems();

  return {
    items,
    countItems,
    hasNextPage,
    loadNextItems,
  };
}
