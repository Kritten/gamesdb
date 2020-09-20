<template>
  {{ collection.countItems.value }} {{ t('session.virtual.label', collection.countItems.value) }}
  <ul>
    <li
      v-for="session in collection.items.value"
      :key="session.id"
      :session="session"
    >
      {{ session.game.name }}
      <button
        v-if="session.currentPlaytime !== undefined"
        type="button"
        @click="useTrackSession.pause(session)"
      >
        Session Pausieren
      </button>
      <button
        v-if="session.currentPlaytime === undefined"
        type="button"
        @click="useTrackSession.continue(session)"
      >
        Session Fortsetzen
      </button>
      <button
        type="button"
        @click="useTrackSession.stop(session)"
      >
        Session Beenden
      </button>
    </li>
  </ul>
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
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Session } from '@/modules/session/session.model';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { defineComponent, ref } from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';

export default defineComponent({
  name: 'ListSessionsVirtual',
  props: {
  },
  setup() {
    const { t } = useI18n();
    const filters = ref<ServiceCollectionFilters>({
      isVirtual: {
        field: 'isVirtual', valueBoolean: true, operator: '=',
      },
    });
    const collection = useCollection<Session>(ServiceSession.loadPage, {
      inputCollectionData: {
        sortBy: ['entity.id'],
        filters,
      },
    });

    const useTrackSession = ServiceSession.useTrackSession();

    for (const event of ['startedSession', 'stoppedSession']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
      store: useStore(),
      useTrackSession,
    };
  },
});
</script>

<style scoped></style>
