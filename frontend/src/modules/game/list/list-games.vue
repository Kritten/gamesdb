<template>
  {{ collection.countItems.value }} {{ t('game.label', collection.countItems.value) }}
  <div>
    <label for="nameGame">{{ t('game.name') }}</label>
    <input
      id="nameGame"
      v-model="filters[0].valueString"
    >
  </div>
  <table>
    <list-item-game
      v-for="game in collection.items.value"
      :key="game.id"
      :game="game"
    />
  </table>
  <button
    v-if="collection.hasNextPage.value"
    :disabled="collection.isLoading.value === true"
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { ServiceGame } from '@/modules/game/game.service';
import ListItemGame from '@/modules/game/list/list-item-game.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Game } from '@/modules/game/game.model';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { defineComponent, ref } from 'vue';
import { InputCollectionFilter } from '@backend/src/utilities/collection/collection.input';

export default defineComponent({
  name: 'ListGames',
  components: { ListItemGame },
  props: {
    digitalOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    analogOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const filters = ref<InputCollectionFilter[]>([
      {
        field: 'name', valueString: undefined, operator: 'like',
      },
    ]);

    if (props.digitalOnly) {
      filters.value.push(
        {
          field: 'isDigital',
          valueBoolean: true,
          operator: '=',
        },
      );
    } else if (props.analogOnly) {
      filters.value.push(
        {
          field: 'isDigital',
          valueBoolean: false,
          operator: '=',
        },
      );
    }

    const collection = useCollection<Game>(ServiceGame, { filters: filters.value });

    for (const event of ['createdGame', 'updatedGame']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
      filters,
    };
  },
});
</script>

<style scoped></style>
