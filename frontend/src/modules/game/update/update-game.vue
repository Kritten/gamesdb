<template>
  <base-entity-update
    :entity="game"
    :i18n-prefix="'game'"
    :use-update-entity="updateGame"
    :validation-rules="validationRules"
  >
    <template #item="propsUpdate">
      <item-game
        v-model:id-b-g-g="propsUpdate.entity.value.idBGG"
        v-model:name="propsUpdate.entity.value.name"
        v-model:description="propsUpdate.entity.value.description"
        v-model:countPlayersMin="propsUpdate.entity.value.countPlayersMin"
        v-model:countPlayersMax="propsUpdate.entity.value.countPlayersMax"
        v-model:minutesPlaytimeMin="propsUpdate.entity.value.minutesPlaytimeMin"
        v-model:minutesPlaytimeMax="propsUpdate.entity.value.minutesPlaytimeMax"
        v-model:isCoop="propsUpdate.entity.value.isCoop"
        v-model:rating-b-g-g="propsUpdate.entity.value.ratingBGG"
        v-model:isDigital="propsUpdate.entity.value.isDigital"
        v-model:complexity="propsUpdate.entity.value.complexity"
        v-model:size="propsUpdate.entity.value.size"
        v-model:universes="propsUpdate.entity.value.universes"
        v-model:categories="propsUpdate.entity.value.categories"
        v-model:mechanisms="propsUpdate.entity.value.mechanisms"
        v-model:moods="propsUpdate.entity.value.moods"
        v-model:images="propsUpdate.entity.value.images"
        :validation="propsUpdate.validation"
      />
    </template>
  </base-entity-update>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import ItemGame from '@/modules/game/item-game.vue';
import { defineComponent, PropType } from 'vue';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';
import { useUpdateGame } from '@/modules/game/composables/useUpdateGame';
import { required } from '@vuelidate/validators';
import { GameLoading } from '@/modules/game/game.types';

export default defineComponent({
  name: 'UpdateGame',
  components: { BaseEntityUpdate, ItemGame },
  props: {
    game: {
      required: true,
      type: Object as PropType<GameLoading>,
    },
  },
  setup() {
    const { t } = useI18n();

    const validationRules = {
      name: {
        required,
      },
      countPlayersMin: {
        required,
      },
    };

    return {
      t,
      updateGame: useUpdateGame,
      validationRules,
    };
  },
});
</script>

<style scoped>

</style>
