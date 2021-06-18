<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-entity-header-info
        i18n-prefix="game"
        :count="countTotalAnalog"
        :validation-rules="validationRules"
        :use-create-entity="useCreateEntity"
      >
        <template #item="{ entity, validation }">
          <item-game
            v-model:name="entity.value.name"
            v-model:description="entity.value.description"
            v-model:countPlayersMin="entity.value.countPlayersMin"
            v-model:countPlayersMax="entity.value.countPlayersMax"
            v-model:minutesPlaytimeMin="entity.value.minutesPlaytimeMin"
            v-model:minutesPlaytimeMax="entity.value.minutesPlaytimeMax"
            v-model:isCoop="entity.value.isCoop"
            v-model:isDigital="entity.value.isDigital"
            v-model:complexity="entity.value.complexity"
            v-model:size="entity.value.size"
            v-model:universes="entity.value.universes"
            v-model:categories="entity.value.categories"
            v-model:mechanisms="entity.value.mechanisms"
            v-model:moods="entity.value.moods"
            v-model:images="entity.value.images"
            :validation="validation"
          />
        </template>
      </base-entity-header-info>
    </div>
    <div class="col-12">
      <!--    <create-game />-->
      <list-games analog-only />
    </div>
  </div>
</template>

<script lang="ts">
import ListGames from '@/modules/game/list/list-games.vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGame } from '@/modules/game/composables/useGame';
import BaseEntityHeaderInfo from '@/modules/app/base/entity/base-entity-header-info.vue';
import { required } from '@vuelidate/validators';
import { useCreateGame } from '@/modules/game/composables/useCreateGame';
import ItemGame from '@/modules/game/item-game.vue';

export default defineComponent({
  name: 'ViewGames',
  components: { ItemGame, BaseEntityHeaderInfo, ListGames },
  setup() {
    const { t } = useI18n();
    const { countTotalAnalog } = useGame();

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
      countTotalAnalog,
      validationRules,
      useCreateEntity: useCreateGame,
    };
  },
});
</script>

<style scoped></style>
