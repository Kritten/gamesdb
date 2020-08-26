<template>
  <form @submit.prevent="updatePlayer.update">
    <div>
      <label for="name">{{ t('player.label') }}</label>
      <input
        id="name"
        v-model="updatePlayer.entity.value.name"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ServicePlayer } from '@/modules/player/player.service';
import { useI18n } from 'vue-i18n';
import { Player } from '@/modules/player/player.model';

export default {
  name: 'UpdatePlayer',
  props: {
    player: {
      required: true,
      type: Player,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updatePlayer = ServicePlayer.useUpdate(context.player);

    return {
      t,
      updatePlayer,
    };
  },
};
</script>

<style scoped>

</style>
