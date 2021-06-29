<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-input-number
        v-model="idBGGInternal"
        :options="{
          label: t('game.idBGG'),
        }"
        :validation="validation?.idBGG"
      >
        <template #after>
          <q-btn
            :disable="idBGGInternal === null"
            :loading="loadingInfoForGame"
            round
            color="primary"
            dense
            flat
            icon="fa fa-cloud-download-alt"
            @click="loadInfoForGame"
          />
        </template>
      </base-input-number>
    </div>

    <div class="col-12">
      <div class="row items-center">
        <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
          <base-input-text
            v-model="nameInternal"
            :options="{
              label: t('game.name'),
            }"
            :validation="validation?.name"
          />
        </div>

        <div
          v-if="infoForGame !== null"
          class="col-6"
        >
          <div class="row items-center">
            <div class="col-shrink q-mx-sm">
              <q-btn
                flat
                round
                color="primary"
                icon="fa fa-arrow-left"
                @click="nameInternal = infoForGame.name"
              />
            </div>
            <div class="col">
              {{ infoForGame.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <base-input-text
          v-model="descriptionInternal"
          :options="{
            label: t('game.description'),
            autogrow: true,
          }"
          :validation="validation?.description"
        />
      </div>

      <div class="col-12">
        <div class="row items-center">
          <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
            <base-input-number
              v-model="countPlayersMinInternal"
              :options="{
                label: t('game.countPlayersMin'),
              }"
              :validation="validation?.countPlayersMin"
            />
          </div>

          <div
            v-if="infoForGame !== null"
            class="col-6"
          >
            <div class="row items-center">
              <div class="col-shrink q-mx-sm">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="fa fa-arrow-left"
                  @click="countPlayersMinInternal = infoForGame.minplayers"
                />
              </div>
              <div class="col">
                {{ infoForGame.minplayers }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row items-center">
          <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
            <base-input-number
              v-model="countPlayersMaxInternal"
              :options="{
                label: t('game.countPlayersMax'),
              }"
              :validation="validation?.countPlayersMax"
            />
          </div>

          <div
            v-if="infoForGame !== null"
            class="col-6"
          >
            <div class="row items-center">
              <div class="col-shrink q-mx-sm">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="fa fa-arrow-left"
                  @click="countPlayersMaxInternal = infoForGame.maxplayers"
                />
              </div>
              <div class="col">
                {{ infoForGame.maxplayers }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="row items-center">
            <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
              <base-input-number
                v-model="minutesPlaytimeMinInternal"
                :options="{
                  label: t('game.minutesPlaytimeMin'),
                }"
                :validation="validation?.minutesPlaytimeMin"
              />
            </div>

            <div
              v-if="infoForGame !== null"
              class="col-6"
            >
              <div class="row items-center">
                <div class="col-shrink q-mx-sm">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="fa fa-arrow-left"
                    @click="minutesPlaytimeMinInternal = infoForGame.minplaytime"
                  />
                </div>
                <div class="col">
                  {{ infoForGame.minplaytime }}
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="row items-center">
              <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
                <base-input-number
                  v-model="minutesPlaytimeMaxInternal"
                  :options="{
                    label: t('game.minutesPlaytimeMax'),
                  }"
                  :validation="validation?.minutesPlaytimeMax"
                />
              </div>

              <div
                v-if="infoForGame !== null"
                class="col-6"
              >
                <div class="row items-center">
                  <div class="col-shrink q-mx-sm">
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="fa fa-arrow-left"
                      @click="minutesPlaytimeMaxInternal = infoForGame.maxplaytime"
                    />
                  </div>
                  <div class="col">
                    {{ infoForGame.maxplaytime }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <base-input-boolean
                    v-model="isCoopInternal"
                    :options="{
                      label: t('game.isCoop'),
                    }"
                    :validation="validation?.isCoop"
                  />
                </div>
                <div class="col-6">
                  <base-input-boolean
                    v-model="isDigitalInternal"
                    :options="{
                      label: t('game.isDigital'),
                    }"
                    :validation="validation?.isDigital"
                  />
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="row items-center">
                <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
                  <input-select-rating
                    v-model="ratingBGGInternal"
                    :validation="validation?.ratingBGG"
                  />
                </div>

                <div
                  v-if="infoForGame !== null"
                  class="col-6"
                >
                  <div class="row items-center">
                    <div class="col-shrink q-mx-sm">
                      <q-btn
                        flat
                        round
                        color="primary"
                        icon="fa fa-arrow-left"
                        @click="ratingBGGInternal = ratingFromBGG(infoForGame.statistics.ratings.average)"
                      />
                    </div>
                    <div class="col">
                      <display-rating :rating="ratingFromBGG(infoForGame.statistics.ratings.average)" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="row items-center">
                  <div :class="[infoForGame === null ? 'col-12' : 'col-6']">
                    <input-select-complexity
                      v-model="complexityInternal"
                      :validation="validation?.complexity"
                    />
                  </div>

                  <div
                    v-if="infoForGame !== null"
                    class="col-6"
                  >
                    <div class="row items-center">
                      <div class="col-shrink q-mx-sm">
                        <q-btn
                          flat
                          round
                          color="primary"
                          icon="fa fa-arrow-left"
                          @click="complexityInternal = complexityFromBGG(infoForGame.statistics.ratings.averageweight)"
                        />
                      </div>
                      <div class="col">
                        <display-complexity :complexity="complexityFromBGG(infoForGame.statistics.ratings.averageweight)" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <input-select-size
                    v-model="sizeInternal"
                    :validation="validation?.size"
                  />
                </div>

                <div class="col-12">
                  <input-select-universe
                    v-model="universesInternal"
                    :validation="validation?.universes"
                  />
                </div>

                <div class="col-12">
                  <input-select-category
                    v-model="categoriesInternal"
                    :validation="validation?.categories"
                  />
                </div>

                <div class="col-12">
                  <input-select-mechanism
                    v-model="mechanismsInternal"
                    :validation="validation?.mechanisms"
                  />
                </div>

                <div class="col-12">
                  <input-select-mood
                    v-model="moodsInternal"
                    :validation="validation?.moods"
                  />
                </div>
              </div>
            <!--  <div>-->
            <!--    <label for="images">{{ t('image.label', 2) }}</label>-->
            <!--    <input-->
            <!--      id="images"-->
            <!--      v-model="filters.name.valueString"-->
            <!--    >-->
            <!--    <div>-->
            <!--      <div v-for="image in collectionImage.items.value">-->
            <!--        {{ image.name }} <button-->
            <!--          type="button"-->
            <!--          @click="$emit('update:images', [...images, image])"-->
            <!--        >-->
            <!--          {{ t('common.add') }}-->
            <!--        </button>-->
            <!--      </div>-->
            <!--    </div>-->
            <!--    <h3>Hinzugefügte Bilder</h3>-->
            <!--    <div v-for="image in images">-->
            <!--      {{ image.name }} <button-->
            <!--        type="button"-->
            <!--        @click="$emit('update:images', images.filter(img => img.id !== image.id))"-->
            <!--      >-->
            <!--        {{ t('common.delete') }}-->
            <!--      </button>-->
            <!--    </div>-->
            <!--  </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { getValidator, useModelWrapper } from '@/modules/app/utilities/helpers';
import {
  defineComponent, PropType, ref,
} from 'vue';
import { ServiceCollectionFilters } from '@/modules/app/utilities/collection/collection.types';
import { Universe } from '@/modules/universe/universe.model';
import { Category } from '@/modules/category/category.model';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { Mood } from '@/modules/mood/mood.model';
import { Validation } from '@vuelidate/core';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import BaseInputNumber from '@/modules/app/base/inputs/base-input-number.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import InputSelectComplexity from '@/modules/game/base/input-select-complexity.vue';
import InputSelectSize from '@/modules/game/base/input-select-size.vue';
import InputSelectUniverse from '@/modules/universe/base/input-select-universe.vue';
import InputSelectCategory from '@/modules/category/base/input-select-category.vue';
import InputSelectMechanism from '@/modules/mechanism/base/input-select-mechanism.vue';
import InputSelectMood from '@/modules/mood/base/input-select-mood.vue';
import { useBGG } from '@/modules/game/composables/useBGG';
import { BggThingDto } from 'boardgamegeekclient/dist/dto';
import DisplayComplexity from '@/modules/game/base/display-complexity.vue';
import InputSelectRating from '@/modules/game/base/input-select-rating.vue';
import DisplayRating from '@/modules/rating/base/display-rating.vue';

export default defineComponent({
  name: 'ItemGame',
  components: {
    DisplayRating,
    InputSelectRating,
    DisplayComplexity,
    InputSelectMood,
    InputSelectMechanism,
    InputSelectCategory,
    InputSelectUniverse,
    InputSelectSize,
    InputSelectComplexity,
    BaseInputBoolean,
    BaseInputNumber,
    BaseInputText,
  },
  props: {
    idBGG: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ratingBGG: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    countPlayersMin: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    countPlayersMax: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    minutesPlaytimeMin: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    minutesPlaytimeMax: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    isCoop: {
      type: Boolean,
      required: true,
    },
    isDigital: {
      type: Boolean,
      required: true,
    },
    complexity: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    size: {
      validator: getValidator({ null: true, number: true }),
      required: true,
    },
    universes: {
      type: Array as PropType<Array<Universe>>,
      required: true,
    },
    categories: {
      type: Array as PropType<Array<Category>>,
      required: true,
    },
    mechanisms: {
      type: Array as PropType<Array<Mechanism>>,
      required: true,
    },
    moods: {
      type: Array as PropType<Array<Mood>>,
      required: true,
    },
    images: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    applyInfoBGGImmediately: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const filters = ref<ServiceCollectionFilters>({
      name: {
        field: 'name', valueString: undefined, operator: 'like',
      },
    });

    const infoForGame = ref<BggThingDto | null>(null);
    const loadingInfoForGame = ref(false);

    const idBGGInternal = useModelWrapper<number>({
      props, emit, name: 'idBGG',
    });
    const nameInternal = useModelWrapper<string>({
      props, emit, name: 'name',
    });
    const ratingBGGInternal = useModelWrapper<number>({
      props, emit, name: 'ratingBGG',
    });
    const countPlayersMinInternal = useModelWrapper<number>({
      props, emit, name: 'countPlayersMin',
    });
    const countPlayersMaxInternal = useModelWrapper<number>({
      props, emit, name: 'countPlayersMax',
    });
    const minutesPlaytimeMinInternal = useModelWrapper<number>({
      props, emit, name: 'minutesPlaytimeMin',
    });
    const minutesPlaytimeMaxInternal = useModelWrapper<number>({
      props, emit, name: 'minutesPlaytimeMax',
    });
    const descriptionInternal = useModelWrapper<string>({
      props, emit, name: 'description',
    });
    const isCoopInternal = useModelWrapper<boolean>({
      props, emit, name: 'isCoop',
    });
    const isDigitalInternal = useModelWrapper<boolean>({
      props, emit, name: 'isDigital',
    });
    const complexityInternal = useModelWrapper<number>({
      props, emit, name: 'complexity',
    });
    const sizeInternal = useModelWrapper<number>({
      props, emit, name: 'size',
    });
    const universesInternal = useModelWrapper<Array<Universe>>({
      props, emit, name: 'universes',
    });
    const categoriesInternal = useModelWrapper<Array<Category>>({
      props, emit, name: 'categories',
    });
    const mechanismsInternal = useModelWrapper<Array<Mechanism>>({
      props, emit, name: 'mechanisms',
    });
    const moodsInternal = useModelWrapper<Array<Mood>>({
      props, emit, name: 'moods',
    });

    const complexityFromBGG = (complexity: number) => Math.round(complexity) - 1;

    const ratingFromBGG = (rating: number) => Math.round(rating) - 1;
    // 1927

    return {
      t,
      filters,
      infoForGame,
      loadingInfoForGame,
      idBGGInternal,
      nameInternal,
      ratingBGGInternal,
      countPlayersMinInternal,
      countPlayersMaxInternal,
      minutesPlaytimeMinInternal,
      minutesPlaytimeMaxInternal,
      descriptionInternal,
      isCoopInternal,
      isDigitalInternal,
      complexityInternal,
      sizeInternal,
      universesInternal,
      categoriesInternal,
      mechanismsInternal,
      moodsInternal,
      complexityFromBGG,
      ratingFromBGG,
      async loadInfoForGame() {
        const { loadInfoForGame } = useBGG();

        loadingInfoForGame.value = true;
        const response = await loadInfoForGame(props.idBGG as number);
        loadingInfoForGame.value = false;

        if (response === null) {
          return;
        }

        if (props.applyInfoBGGImmediately) {
          nameInternal.value = response.name;
          countPlayersMinInternal.value = response.minplayers;
          countPlayersMaxInternal.value = response.maxplayers;
          minutesPlaytimeMinInternal.value = response.minplaytime;
          minutesPlaytimeMaxInternal.value = response.maxplaytime;
          ratingBGGInternal.value = ratingFromBGG(response.statistics.ratings.average);
          complexityInternal.value = complexityFromBGG(response.statistics.ratings.averageweight);
        } else {
          infoForGame.value = response;
        }
        console.warn(response, 'response');
      },
    };
  },
});
</script>

<style scoped>

</style>
