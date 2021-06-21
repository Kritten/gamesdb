<template>
  <template v-if="game !== null">
    <q-card>
      <q-toolbar>
        <q-toolbar-title>
          {{ game.name }}
        </q-toolbar-title>

        <base-entity-update
          :entity="game"
          :i18n-prefix="'game'"
          :use-update-entity="updateGame"
          :validation-rules="validationRules"
        >
          <template #item="propsUpdate">
            <item-game
              v-model:name="propsUpdate.entity.value.name"
              v-model:description="propsUpdate.entity.value.description"
              v-model:countPlayersMin="propsUpdate.entity.value.countPlayersMin"
              v-model:countPlayersMax="propsUpdate.entity.value.countPlayersMax"
              v-model:minutesPlaytimeMin="propsUpdate.entity.value.minutesPlaytimeMin"
              v-model:minutesPlaytimeMax="propsUpdate.entity.value.minutesPlaytimeMax"
              v-model:isCoop="propsUpdate.entity.value.isCoop"
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
      </q-toolbar>

      <q-card-section>
        {{ game.description }}
      </q-card-section>
    </q-card>

    <!--    <details>-->
    <!--      <summary>Spiel bearbeiten</summary>-->
    <!--      <update-game :game="game" />-->
    <!--    </details>-->
    <!--    <h2>Sessions</h2>-->
    <!--    <details>-->
    <!--      <summary>Session anlegen</summary>-->
    <!--      <create-session :game="game" />-->
    <!--    </details>-->
    <!--    <list-session :game="game" />-->
    <!--    <delete-game :game="game" />-->
  </template>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ServiceGame } from '@/modules/game/game.service';
import { Game } from '@/modules/game/game.model';
import CreateSession from '@/modules/session/create/create-session.vue';
import ListSession from '@/modules/session/list/list-sessions.vue';
import DeleteGame from '@/modules/game/delete/delete-game.vue';
import UpdateGame from '@/modules/game/update/update-game.vue';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';
import { useUpdateGame } from '@/modules/game/composables/useUpdateGame';
import ItemGame from '@/modules/game/item-game.vue';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'ViewGame',
  components: {
    ItemGame,
    BaseEntityUpdate,
    UpdateGame,
    DeleteGame,
    ListSession,
    CreateSession,
  },
  setup() {
    const route = useRoute();
    const idGame = route.params.id as string;
    const game = ref<Game | null>(null);

    ServiceGame.getOrLoadGame(idGame).then((value: Game) => { game.value = value; });

    const validationRules = {
      name: {
        required,
      },
      countPlayersMin: {
        required,
      },
    };

    return {
      game,
      updateGame: useUpdateGame,
      validationRules,
    };
  },
});
</script>

<style scoped></style>
