<template>
  {{ collection.countItems.value }} {{ t('session.label', collection.countItems.value) }}
  <table border="1">
    <tr>
      <th>ID</th>
      <th>Spieler</th>
      <th>Gewinner</th>
      <th>Spielzeiten</th>
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
import { useCollection } from '@/modules/app/utilities/collection';
import { Session } from '@/modules/session/session.model';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ListSession',
  components: { ListItemSession },
  setup() {
    const { t } = useI18n();
    const collection = useCollection(Session, ServiceSession, 'id');

    return {
      t,
      collection,
      store: useStore(),
    };
  },
};
</script>

<style scoped></style>
