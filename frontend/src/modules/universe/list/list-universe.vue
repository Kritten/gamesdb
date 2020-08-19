<template>
  <create-universe />
  <table>
    <list-item-universe
      v-for="universe in universes"
      :key="universe.id"
      :universe="universe"
    />
  </table>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CreateUniverse from '@/modules/universe/create/create-universe';
import ListItemUniverse from '@/modules/universe/list/list-item-universe';

export default {
  name: 'ListUniverses',
  components: { ListItemUniverse, CreateUniverse },
  setup() {
    const store = useStore();

    const universes = computed(() => (store.state.moduleUniverse.universes === null ? [] : store.state.moduleUniverse.universes));

    return {
      universes,
    };
  },
};
</script>

<style scoped></style>
