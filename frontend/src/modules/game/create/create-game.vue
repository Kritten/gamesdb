<template>
  <form @submit.prevent="createGame.create">
    <item-game
      v-model:name="createGame.entity.value.name"
      v-model:description="createGame.entity.value.description"
      v-model:countPlayersMin="createGame.entity.value.countPlayersMin"
      v-model:countPlayersMax="createGame.entity.value.countPlayersMax"
      v-model:minutesPlaytimeMin="createGame.entity.value.minutesPlaytimeMin"
      v-model:minutesPlaytimeMax="createGame.entity.value.minutesPlaytimeMax"
      v-model:isCoop="createGame.entity.value.isCoop"
      v-model:isDigital="createGame.entity.value.isDigital"
      v-model:complexity="createGame.entity.value.complexity"
      v-model:size="createGame.entity.value.size"
      v-model:universes="createGame.entity.value.universes"
      v-model:categories="createGame.entity.value.categories"
      v-model:mechanisms="createGame.entity.value.mechanisms"
      v-model:moods="createGame.entity.value.moods"
      v-model:images="createGame.entity.value.images"
    />
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceGame } from '@/modules/game/game.service';
import { useStore } from 'vuex';
import ItemGame from '@/modules/game/item-game.vue';
import { defineComponent, PropType } from 'vue';
import { GameInterface } from '@/modules/game/game.types';

export default defineComponent({
  name: 'CreateGame',
  components: { ItemGame },
  props: {
    initialData: {
      required: false,
      type: Object as PropType<GameInterface>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { t } = useI18n();
    const store = useStore();

    const createGame = ServiceGame.useCreate({ initialData: props.initialData });

    return {
      t,
      store,
      createGame,
    };
  },
});
</script>

<style scoped>

</style>
