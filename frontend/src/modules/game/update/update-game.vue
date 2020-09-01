<template>
  <form @submit.prevent="updateGame.update">
    <item-game
      v-model:name="updateGame.entity.value.name"
      v-model:description="updateGame.entity.value.description"
      v-model:countPlayersMin="updateGame.entity.value.countPlayersMin"
      v-model:countPlayersMax="updateGame.entity.value.countPlayersMax"
      v-model:minutesPlaytimeMin="updateGame.entity.value.minutesPlaytimeMin"
      v-model:minutesPlaytimeMax="updateGame.entity.value.minutesPlaytimeMax"
      v-model:isCoop="updateGame.entity.value.isCoop"
      v-model:isDigital="updateGame.entity.value.isDigital"
      v-model:complexity="updateGame.entity.value.complexity"
      v-model:size="updateGame.entity.value.size"
      v-model:universes="updateGame.entity.value.universes"
      v-model:categories="updateGame.entity.value.categories"
      v-model:mechanisms="updateGame.entity.value.mechanisms"
      v-model:moods="updateGame.entity.value.moods"
      v-model:images="updateGame.entity.value.images"
    />
    <div>
      <button type="submit">
        {{ t('common.edit') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import ItemGame from '@/modules/game/item-game.vue';
import { ServiceGame } from '@/modules/game/game.service';
import { Game } from '@/modules/game/game.model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UpdateGame',
  components: { ItemGame },
  props: {
    game: {
      required: true,
      type: Game,
    },
  },
  setup(context) {
    const { t } = useI18n();
    const updateGame = ServiceGame.useUpdate(context.game);

    return {
      t,
      updateGame,
    };
  },
});
</script>

<style scoped>

</style>
