<template>
  <form @submit.prevent="createPlayer.create">
    <div>
      <label for="name">{{ t('player.label') }}</label>
      <input
        id="name"
        v-model="createPlayer.player.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServicePlayer } from '@/modules/player/player.service';
import { useI18n } from 'vue-i18n';

export default {
  name: 'CreatePlayer',
  setup() {
    const { t } = useI18n();
    const createPlayer = ServicePlayer.useCreate();

    return {
      t,
      createPlayer,
    };
  },
};
</script>

<style scoped>

</style>
