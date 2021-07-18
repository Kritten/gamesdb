<template>
  <base-entity-delete
    :entity="game"
    i18n-prefix="game"
    :use-delete-entity="useDeleteGame"
    label
    @submit="deleted"
  />
</template>

<script lang="ts">
import { Game } from '@/modules/game/game.model';
import { defineComponent } from 'vue';
import BaseEntityDelete from '@/modules/app/base/entity/base-entity-delete.vue';
import { useDeleteGame } from '@/modules/game/composables/useDeleteGame';
import { useRouter } from '@/router';

export default defineComponent({
  name: 'DeleteGame',
  components: { BaseEntityDelete },
  props: {
    game: {
      required: true,
      type: Game,
    },
  },
  setup() {
    return {
      useDeleteGame,
      deleted() {
        void useRouter().push({ name: 'games' });
      },
    };
  },
});
</script>

<style scoped>

</style>
