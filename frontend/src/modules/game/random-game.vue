<template>
  <button @click="useRandomGame.select()">
    {{ t('game.random.select') }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceGame } from '@/modules/game/game.service';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RandomGame',
  props: {
    filters: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    return {
      t: useI18n().t,
      useRandomGame: ServiceGame.useRandomGame({ filters: props.filters }),
    };
  },
});
</script>

<style scoped>

</style>
