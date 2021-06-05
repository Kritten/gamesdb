<template>
  <q-markup-table>
    <thead>
      <tr>
        <th class="text-left">
          {{ t('game.label') }}
        </th>
        <th class="text-right">
          {{ t('playtime.label') }}
        </th>
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
        <td
          class="text-right"
          style="width: 1px"
        >
          <span
            v-if="session.currentPlaytime !== undefined"
          >
            {{ formatDistanceToNowStrict(session.currentPlaytime.start, {locale: de, includeSeconds: true }) }}
          </span>
        </td>
        <td style="width: 1px">
          <q-btn
            icon="fas fa-edit"
            color="primary"
            flat
            round
            class="q-mr-md"
            @click="useTrackSession.stop(session)"
          >
            <q-tooltip>
              {{ t('common.edit') }}
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="session.currentPlaytime !== undefined"
            color="warning"
            icon="fas fa-pause"
            flat
            round
            @click="useTrackSession.pause(session)"
          >
            <q-tooltip>
              {{ t('session.pause') }}
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="session.currentPlaytime === undefined"
            color="positive"
            icon="fas fa-play"
            flat
            round
            @click="useTrackSession.continue(session)"
          >
            <q-tooltip>
              {{ t('session.continue') }}
            </q-tooltip>
          </q-btn>

          <q-btn
            icon="fas fa-stop"
            color="negative"
            flat
            round
            @click="useTrackSession.stop(session)"
          >
            <q-tooltip>
              {{ t('session.stop') }}
            </q-tooltip>
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts">
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
        count: undefined,
        filters,
      },
    });

    const useTrackSession = ServiceSession.useTrackSession();

    for (const event of ['startedSessionVirtual', 'continuedSession', 'pausedSession', 'stoppedSession']) {
      queue.listen(event, () => {
        collection.reset();
      });
    }

    return {
      t,
      collection,
      useTrackSession,
      formatDistanceToNowStrict,
      de,
    };
  },
});
</script>

<style scoped></style>
