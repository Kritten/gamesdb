<template>
  <create-mood />
  <table>
    <list-item-mood
      v-for="mood in moods"
      :key="mood.id"
      :mood="mood"
    />
  </table>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CreateMood from '@/modules/mood/create/create-mood';
import ListItemMood from '@/modules/mood/list/list-item-mood';

export default {
  name: 'ListMoods',
  components: { ListItemMood, CreateMood },
  setup() {
    const store = useStore();

    const moods = computed(() => (store.state.moduleMood.moods === null ? [] : store.state.moduleMood.moods));

    return {
      moods,
    };
  },
};
</script>

<style scoped></style>
