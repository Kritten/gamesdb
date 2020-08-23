<template>
  {{ collection.countItems.value }} Sessions
  <table>
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

export default {
  name: 'ListSession',
  components: { ListItemSession },
  setup() {
    const collection = useCollection(Session, ServiceSession, 'id');

    return {
      collection,
      store: useStore(),
    };
  },
};
</script>

<style scoped></style>
