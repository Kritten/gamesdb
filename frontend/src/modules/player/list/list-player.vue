<template>
  <create-player />
  <table>
    <list-item-player
      v-for="player in players"
      :key="player.id"
      :player="player"
    />
  </table>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import CreatePlayer from '@/modules/player/create/create-player';
import ListItemPlayer from '@/modules/player/list/list-item-player';

export default defineComponent({
  name: 'ListPlayers',
  components: { ListItemPlayer, CreatePlayer },
  setup() {
    const store = useStore();

    const players = computed(() => (store.state.modulePlayer.players === null ? [] : store.state.modulePlayer.players));

    return {
      players,
    };
  },
});
</script>

<style scoped></style>
