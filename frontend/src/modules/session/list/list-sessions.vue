<template>
  {{ collection.countItems.value }} {{ t('session.label', collection.countItems.value) }}
  <table border="1">
    <tr>
      <th>ID</th>
      <th>{{ t('session.isChallenge') }}</th>
      <th>Spieler</th>
      <th>Gewinner</th>
      <th>Spielzeiten</th>
      <th>{{ t('session.comment') }}</th>
      <th />
    </tr>
    <list-item-session
      v-for="session in collection.items.value"
      :key="session.id"
      :session="session"
    />
  </table>
  <button
    v-if="collection.hasNextPage.value"
    @click="collection.loadNextItems"
  >
    Mehr laden
  </button>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ServiceSession } from '@/modules/session/session.service';
import ListItemSession from '@/modules/session/list/list-item-session.vue';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Session } from '@/modules/session/session.model';
import { useI18n } from 'vue-i18n';
import { Game } from '@/modules/game/game.model';
import { queue } from '@/queue';
import { defineComponent, ref } from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
  name: 'ListSession',
  components: { ListItemSession },
  props: {
    game: {
      type: Game,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const filters = ref<ServiceCollectionFilters>({
      game: {
        field: 'game', valueString: props.game.id, operator: '=',
      },
      isVirtual: {
        field: 'isVirtual', valueBoolean: false, operator: '=',
      },
    });
    const collection = useCollection<Session>(ServiceSession.loadPage, {
      inputCollectionData: {
        sortBy: ref(['entity.id']),
        filters,
      },
    });

    for (const event of ['createdSession', 'deletedSession']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
      store: useStore(),
    };
  },
});
</script>

<style scoped></style>
