<template>
  <button @click="confirmDelete">
    {{ t('common.delete') }}
  </button>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceGame } from '@/modules/game/game.service';
import { Game } from '@/modules/game/game.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteGame',
  props: {
    game: {
      required: true,
      type: Game,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const deleteGame = ServiceGame.useDelete();

    const confirmDelete = () => {
      const confirmed = confirm(`Spiel ${context.game.name} löschen?`);

      if (confirmed) {
        deleteGame.delete(context.game);
      }
    };

    return {
      t,
      confirmDelete,
    };
  },
});
</script>

<style scoped>

</style>
