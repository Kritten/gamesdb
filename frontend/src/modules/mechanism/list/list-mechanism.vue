<template>
  <create-mechanism />
  <table>
    <list-item-mechanism
      v-for="mechanism in mechanisms"
      :key="mechanism.id"
      :mechanism="mechanism"
    />
  </table>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import CreateMechanism from '@/modules/mechanism/create/create-mechanism.vue';
import ListItemMechanism from '@/modules/mechanism/list/list-item-mechanism.vue';

export default defineComponent({
  name: 'ListMechanisms',
  components: { ListItemMechanism, CreateMechanism },
  setup() {
    const store = useStore();

    const mechanisms = computed(() => (store.state.moduleMechanism.mechanisms === null ? [] : store.state.moduleMechanism.mechanisms));

    return {
      mechanisms,
    };
  },
});
</script>

<style scoped></style>
