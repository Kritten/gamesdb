<template>
  {{ collection.countItems.value }} {{ t('session.virtual.label', collection.countItems.value) }}
  <table>
    <thead>
      <tr>
        <th>{{ t('game.label') }}</th>
        <th>{{ t('session.label') }}</th>
        <th>{{ t('playtime.label') }}</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="session in collection.items.value"
        :key="session.id"
        :session="session"
      >
        <td>
          {{ session.game.name }}
        </td>
        <td>
          <details>
            <summary>{{ t('session.label') }}</summary>
            <update-session :session="session" />
          </details>
        </td>
        <td>
          <span
            v-if="session.currentPlaytime !== undefined"
          >
            {{ formatDistanceToNowStrict(session.currentPlaytime.start, {locale: de, includeSeconds: true }) }}
          </span>
        </td>
        <td>
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
        </td>
      </tr>
    </tbody>
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
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { Session } from '@/modules/session/session.model';
import { useI18n } from 'vue-i18n';
import { queue } from '@/queue';
import { defineComponent, ref } from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import UpdateSession from '@/modules/session/update/update-session.vue';
import { formatDistanceToNowStrict } from 'date-fns';
import { de } from 'date-fns/locale';

export default defineComponent({
  name: 'ListSessionsVirtual',
  components: { UpdateSession },
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
        sortBy: ref(['entity.id']),
        filters,
      },
    });

    const useTrackSession = ServiceSession.useTrackSession();

    for (const event of ['startedSession', 'continuedSession', 'pausedSession', 'stoppedSession']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
      store: useStore(),
      useTrackSession,
      formatDistanceToNowStrict,
      de,
    };
  },
});
</script>

<style scoped></style>
