<template>
  <div
    class="col-12 col-md-6 col-lg-4 col-xl-3"
  >
    <div v-if="game.value === null">
      test
    </div>
    <q-card
      v-else
      class="column full-height"
    >
      <q-card-section class="row col-grow">
        <div class="col">
          <span class="text-h6">
            {{ game.value.name }}
          </span>
        </div>
        <div
          v-if="reduced === false"
          class="col-shrink"
        >
          <update-game :game="game.value" />
        </div>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-12">
          <q-carousel
            v-model="slide"
            height="15rem"
            animated
            infinite
            :autoplay="autoplay"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide
              v-for="(image, index) in game.value.images"
              :key="index"
              :name="index"
            >
              <q-img
                :src="image"
                fit="contain"
                height="14rem"
              />
            </q-carousel-slide>
          </q-carousel>
        </div>
      </q-card-section>

      <q-card-section v-if="reduced === false">
        <q-markup-table flat>
          <tbody>
            <tr>
              <td>{{ t('rating.label') }}</td>
              <td>
                <display-rating :rating="game.value.ratingAverage" />
              </td>
            </tr>
            <tr>
              <td>{{ t('game.filters.countPlayers') }}</td>
              <td>{{ infoCountPlayers }}</td>
            </tr>
            <tr>
              <td>{{ t('game.complexity') }}</td>
              <td><display-complexity :complexity="game.value.complexity" /></td>
            </tr>
            <tr>
              <td>{{ t('game.size') }}</td>
              <td>
                <display-size :size="game.value.size" />
              </td>
            </tr>
            <tr>
              <td>{{ t('playtime.label') }}</td>
              <td>
                <display-playtime-game
                  :minutes-playtime-min="game.value.minutesPlaytimeMin"
                  :minutes-playtime-max="game.value.minutesPlaytimeMax"
                />
              </td>
            </tr>
            <tr>
              <td>{{ t('game.isCoop') }}</td>
              <td><display-is-coop :is-coop="game.value.isCoop" /> </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-actions
        v-if="reduced === false"
        align="right"
        class="row"
      >
        <div class="col-shrink">
          <q-btn
            flat
            icon="fas fa-eye"
            color="primary"
            :label="t('common.details')"
            :to="{name: 'game', params: {id: game.value.id}}"
          />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import DisplayComplexity from '@/modules/game/base/display-complexity.vue';
import DisplaySize from '@/modules/game/base/display-size.vue';
import DisplayRating from '@/modules/rating/base/display-rating.vue';
import DisplayPlaytimeGame from '@/modules/game/base/display-playtime-game.vue';
import DisplayIsCoop from '@/modules/game/base/display-is-coop.vue';
import UpdateGame from '@/modules/game/update/update-game.vue';
import { GameLoading } from '@/modules/game/game.types';

export default defineComponent({
  name: 'ListItemGame',
  components: {
    UpdateGame,
    DisplayIsCoop,
    DisplayPlaytimeGame,
    DisplayRating,
    DisplaySize,
    DisplayComplexity,
  },
  props: {
    game: {
      required: true,
      type: Object as PropType<GameLoading>,
    },
    reduced: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const autoplay = ref(true);
    const slide = ref(0);

    return {
      t,
      autoplay,
      slide,
      infoCountPlayers: computed(
        () => {
          if (props.game.value === null) {
            return '';
          }
          return t('game.infoCountPlayers', {
            countPlayersMin: props.game.value.countPlayersMin,
            countPlayersMax: props.game.value.countPlayersMax,
          }, props.game.value.countPlayersMin === props.game.value.countPlayersMax ? 1 : 2);
        },
      ),
    };
  },
});
</script>

<style scoped>
  td:nth-child(2) {
    text-align: end;
  }
</style>
