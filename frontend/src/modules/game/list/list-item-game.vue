<template>
  <div
    class="col-4"
  >
    <q-card class="column full-height">
      <q-card-section class="row col-grow">
        <div class="col-12">
          <span class="text-h6">
            {{ game.name }}
          </span>
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
              v-for="image in game.images"
              :key="image.id"
              :name="image.id"
            >
              <q-img
                :src="image.link"
                fit="contain"
                height="14rem"
              />
            </q-carousel-slide>
          </q-carousel>
        </div>
      </q-card-section>

      <q-card-section>
        <q-markup-table flat>
          <tbody>
            <tr>
              <td>{{ t('rating.label') }}</td>
              <td>
                <display-rating :rating="game.ratingAverage" />
              </td>
            </tr>
            <tr>
              <td>{{ t('game.filters.countPlayers') }}</td>
              <td>{{ infoCountPlayers }}</td>
            </tr>
            <tr>
              <td>{{ t('game.complexity') }}</td>
              <td><display-complexity :complexity="game.complexity" /></td>
            </tr>
            <tr>
              <td>{{ t('game.size') }}</td>
              <td>
                <display-size :size="game.size" />
              </td>
            </tr>
            <tr>
              <td>{{ t('playtime.label') }}</td>
              <td>
                <display-playtime-game
                  :minutes-playtime-min="game.minutesPlaytimeMin"
                  :minutes-playtime-max="game.minutesPlaytimeMax"
                />
              </td>
            </tr>
            <tr>
              <td>{{ t('game.isCoop') }}</td>
              <td><display-is-coop :is-coop="game.isCoop" /> </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-actions
        align="right"
        class="row"
      >
        <div class="col-shrink">
          <q-btn
            flat
            icon="fas fa-eye"
            color="primary"
            :label="t('common.details')"
            :to="{name: 'game', params: {id: game.id}}"
          />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Game } from '@/modules/game/game.model';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import DisplayComplexity from '@/modules/game/base/display-complexity.vue';
import DisplaySize from '@/modules/game/base/display-size.vue';
import DisplayRating from '@/modules/rating/base/display-rating.vue';
import DisplayPlaytimeGame from '@/modules/game/base/display-playtime-game.vue';
import DisplayIsCoop from '@/modules/game/base/display-is-coop.vue';

export default defineComponent({
  name: 'ListItemGame',
  components: {
    DisplayIsCoop,
    DisplayPlaytimeGame,
    DisplayRating,
    DisplaySize,
    DisplayComplexity,
  },
  props: {
    game: {
      required: true,
      type: Object as PropType<Game>,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const autoplay = ref(true);
    const slide = ref(props.game.images[0]?.id);

    return {
      t,
      autoplay,
      slide,
      infoCountPlayers: computed(
        () => t('game.infoCountPlayers', {
          countPlayersMin: props.game.countPlayersMin,
          countPlayersMax: props.game.countPlayersMax,
        }, props.game.countPlayersMin === props.game.countPlayersMax ? 1 : 2),
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
