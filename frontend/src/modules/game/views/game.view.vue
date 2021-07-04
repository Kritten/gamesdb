<template>
  <template v-if="game !== null">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <base-card
          :title="game.name"
        >
          <template #actions>
            <update-game :game="game" />
          </template>

          <q-card-section>
            {{ game.description }}
          </q-card-section>
        </base-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-section>
            <q-list>
              <q-item
                v-for="(property, index) in properties"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>
                    <template v-if="property.value !== undefined">
                      {{ property.value }}
                    </template>
                    <template v-else>
                      <component
                        :is="property.component"
                        v-bind="property.props"
                      />
                    </template>
                  </q-item-label>
                  <q-item-label caption>
                    {{ property.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <base-card
          :title="`${t('session.label', 2)} (${countSessions === undefined ? '' : countSessions})`"
          expandable
        >
          <template #actions>
            <create-session :game="game" />
          </template>

          <list-session
            :game="game"
            @updated-count-items="countSessions = $event"
          />
        </base-card>
      </div>

      <div class="col-12 ">
        <q-card>
          <q-card-section>
            <delete-game :game="game" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, Ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { ServiceGame } from '@/modules/game/game.service';
import { Game } from '@/modules/game/game.model';
import CreateSession from '@/modules/session/create/create-session.vue';
import ListSession from '@/modules/session/list/list-sessions.vue';
import DeleteGame from '@/modules/game/delete/delete-game.vue';
import UpdateGame from '@/modules/game/update/update-game.vue';
import BaseEntityUpdate from '@/modules/app/base/entity/base-entity-update.vue';
import DisplayComplexity from '@/modules/game/base/display-complexity.vue';
import DisplaySize from '@/modules/game/base/display-size.vue';
import DisplayPlaytimeGame from '@/modules/game/base/display-playtime-game.vue';
import { useUpdateGame } from '@/modules/game/composables/useUpdateGame';
import ItemGame from '@/modules/game/item-game.vue';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { displayIsCoop } from '@/modules/app/utilities/helpers';
import BaseCard from '@/modules/app/base/base-card.vue';

export default defineComponent({
  name: 'ViewGame',
  components: {
    BaseCard,
    ItemGame,
    BaseEntityUpdate,
    UpdateGame,
    DeleteGame,
    ListSession,
    CreateSession,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const idGame = route.params.id as string;
    const game = ref<Game | null>(null);
    const countSessions = ref<number>();

    ServiceGame.getOrLoadGame(idGame).then((value: Game) => { game.value = value; });

    const properties: Ref<Array<{
      label: string,
      value?: string,
      component?: unknown,
      props?: Record<string, unknown>,
    }>> = computed(() => {
      if (game.value === null) {
        return [];
      }
      return [
        {
          label: t('game.filters.countPlayers'),
          value: t('game.infoCountPlayers', {
            countPlayersMin: game.value.countPlayersMin,
            countPlayersMax: game.value.countPlayersMax,
          }, game.value.countPlayersMin === game.value.countPlayersMax ? 1 : 2),
        },
        {
          label: t('playtime.label'),
          component: DisplayPlaytimeGame,
          props: {
            minutesPlaytimeMin: game.value.minutesPlaytimeMin,
            minutesPlaytimeMax: game.value.minutesPlaytimeMax,
          },
        },
        {
          label: t('game.isCoop'),
          value: displayIsCoop(game.value.isCoop),
        },
        {
          label: t('game.complexity'),
          component: DisplayComplexity,
          props: {
            complexity: game.value.complexity,
          },
        },
        {
          label: t('game.size'),
          component: DisplaySize,
          props: {
            size: game.value.size,
          },
        },
        {
          label: t('universe.label', game.value.universes.length),
          value: game.value.universes.map((universe) => universe.name).join(', '),
        },
        {
          label: t('category.label', game.value.categories.length),
          value: game.value.categories.map((category) => category.name).join(', '),
        },
        {
          label: t('mechanism.label', game.value.mechanisms.length),
          value: game.value.mechanisms.map((mechanism) => mechanism.name).join(', '),
        },
        {
          label: t('mood.label', game.value.moods.length),
          value: game.value.moods.map((mood) => mood.name).join(', '),
        },
      ];
    });

    return {
      t,
      game,
      properties,
      countSessions,
    };
  },
});
</script>

<style scoped></style>
