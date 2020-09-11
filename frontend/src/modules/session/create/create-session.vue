<template>
  <form @submit.prevent="createSession.create(game)">
    <div v-if="game === undefined">
      <label for="game">{{ t('game.label', 2) }}</label>
      <input
        id="game"
        v-model="filtersGame.name.valueString"
      >
      <div>
        <div
          v-for="gameLocal in collectionGame.items.value"
          :key="gameLocal.id"
        >
          {{ gameLocal.name }} <button
            type="button"
            @click="createSession.entity.value.game = gameLocal"
          >
            {{ t('common.select') }}
          </button>
        </div>
      </div>
    </div>
    <item-session
      v-model:comment="createSession.entity.value.comment"
      v-model:is-challenge="createSession.entity.value.isChallenge"
      v-model:players="createSession.entity.value.players"
      v-model:winners="createSession.entity.value.winners"
    />
    <div>
      <p>{{ t('playtime.label', 2) }}</p>
      <item-playtime
        v-model:start="createSession.playtimeNew.value.start"
        v-model:end="createSession.playtimeNew.value.end"
      />
      <div>
        <button
          type="button"
          @click="createSession.playtimeAdd"
        >
          {{ t('playtime.label') }} {{ t('common.create') }}
        </button>
      </div>
      <div
        v-for="(playtime, index) in createSession.entity.value.playtimes"
        :key="index"
      >
        <display-playtime
          :start="playtime.start"
          :end="playtime.end"
        />
        <button
          type="button"
          @click="createSession.playtimeRemove(playtime)"
        >
          {{ t('playtime.label') }} {{ t('common.delete') }}
        </button>
      </div>
    </div>
    <div>
      <button type="submit">
        {{ t('common.create') }}
      </button>
      <button
        type="button"
        @click="useTrackSession.start(createSession.entity, game)"
      >
        Start
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceSession } from '@/modules/session/session.service';
import { useStore } from 'vuex';
import { Game } from '@/modules/game/game.model';
import ItemSession from '@/modules/session/item-session.vue';
import ItemPlaytime from '@/modules/playtime/item-playtime.vue';
import DisplayPlaytime from '@/modules/playtime/display-playtime.vue';
import { defineComponent, ref } from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { useCollection } from '@/modules/app/utilities/collection/collection';
import { ServiceGame } from '@/modules/game/game.service';

export default defineComponent({
  name: 'CreateSession',
  components: {
    ItemPlaytime, ItemSession, DisplayPlaytime,
  },
  props: {
    game: {
      type: Game,
      required: false,
      default: undefined,
    },
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();

    const createSession = ServiceSession.useCreate();
    const useTrackSession = ServiceSession.useTrackSession();

    const filtersGame = ref<ServiceCollectionFilters>({
      name: {
        field: 'name', valueString: undefined, operator: 'like',
      },
    });
    const collectionGame = useCollection<Game>(ServiceGame.loadPage, { count: 5, filters: filtersGame });

    return {
      t,
      store,
      createSession,
      useTrackSession,
      collectionGame,
      filtersGame,
    };
  },
});
</script>

<style scoped>

</style>
