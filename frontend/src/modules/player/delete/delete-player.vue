<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script>
import { ServicePlayer } from '@/modules/player/player.service';
import { useI18n } from 'vue-i18n';
import { Player } from '@/modules/player/player.model';

export default {
  name: 'DeletePlayer',
  props: {
    player: {
      required: true,
      type: Player,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deletePlayer = ServicePlayer.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Spieler '${context.player.name}' löschen?`);

      if (confirmed) {
        deletePlayer.delete(context.player);
      }
    };

    return {
      t,
      deletePlayer,
      confirmDelete,
    };
  },
};
</script>

<style scoped>

</style>
