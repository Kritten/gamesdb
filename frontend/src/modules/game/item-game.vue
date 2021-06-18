<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <base-input-text
        v-model="nameInternal"
        :options="{
          label: t('game.name'),
        }"
        :validation="validation?.name"
      />
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
      <base-input-number
        v-model="countPlayersMinInternal"
        :options="{
          label: t('game.countPlayersMin'),
        }"
        :validation="validation?.countPlayersMin"
      />
    </div>
    <div class="col-12">
      <base-input-number
        v-model="countPlayersMaxInternal"
        :options="{
          label: t('game.countPlayersMax'),
        }"
        :validation="validation?.countPlayersMax"
      />
    </div>
    <div class="col-12">
      <base-input-number
        v-model="minutesPlaytimeMinInternal"
        :options="{
          label: t('game.minutesPlaytimeMin'),
        }"
        :validation="validation?.minutesPlaytimeMin"
      />
    </div>
    <div class="col-12">
      <base-input-number
        v-model="minutesPlaytimeMaxInternal"
        :options="{
          label: t('game.minutesPlaytimeMax'),
        }"
        :validation="validation?.minutesPlaytimeMax"
      />
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
      <input-select-complexity
        v-model="complexityInternal"
        :validation="validation?.complexity"
      />
    </div>
    <div class="col-12">
      <input-select-size
        v-model="sizeInternal"
        :validation="validation?.size"
      />
    </div>
  </div>
<!--  <div>-->
<!--    <label for="universes">{{ t('universe.label', 2) }}</label>-->
<!--    <select-->
<!--      id="universes"-->
<!--      v-model="universesInternal"-->
<!--      multiple-->
<!--    >-->
<!--      <option-->
<!--        v-for="universe in store.state.moduleUniverse.universes"-->
<!--        :key="universe.id"-->
<!--        :value="universe.id"-->
<!--      >-->
<!--        {{ universe.name }}-->
<!--      </option>-->
<!--    </select>-->
<!--  </div>-->
<!--  <div>-->
<!--    <label for="categories">{{ t('category.label', 2) }}</label>-->
<!--    <select-->
<!--      id="categories"-->
<!--      v-model="categoriesInternal"-->
<!--      multiple-->
<!--    >-->
<!--      <option-->
<!--        v-for="category in store.state.moduleCategory.categories"-->
<!--        :key="category.id"-->
<!--        :value="category.id"-->
<!--      >-->
<!--        {{ category.name }}-->
<!--      </option>-->
<!--    </select>-->
<!--  </div>-->
<!--  <div>-->
<!--    <label for="mechanisms">{{ t('mechanism.label', 2) }}</label>-->
<!--    <select-->
<!--      id="mechanisms"-->
<!--      v-model="mechanismsInternal"-->
<!--      multiple-->
<!--    >-->
<!--      <option-->
<!--        v-for="mechanism in store.state.moduleMechanism.mechanisms"-->
<!--        :key="mechanism.id"-->
<!--        :value="mechanism.id"-->
<!--      >-->
<!--        {{ mechanism.name }}-->
<!--      </option>-->
<!--    </select>-->
<!--  </div>-->
<!--  <div>-->
<!--    <label for="moods">{{ t('mood.label', 2) }}</label>-->
<!--    <select-->
<!--      id="moods"-->
<!--      v-model="moodsInternal"-->
<!--      multiple-->
<!--    >-->
<!--      <option-->
<!--        v-for="mood in store.state.moduleMood.moods"-->
<!--        :key="mood.id"-->
<!--        :value="mood.id"-->
<!--      >-->
<!--        {{ mood.name }}-->
<!--      </option>-->
<!--    </select>-->
<!--  </div>-->
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
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { getValidator, useModelWrapper } from '@/modules/app/utilities/helpers';
import { defineComponent, PropType, ref } from 'vue';
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
import { useCollection } from '../app/utilities/collection/collection';
import { Image } from '../image/image.model';
import { ServiceImage } from '../image/image.service';

export default defineComponent({
  name: 'ItemGame',
  components: {
    InputSelectSize, InputSelectComplexity, BaseInputBoolean, BaseInputNumber, BaseInputText,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
      type: Array as PropType<Array<Image>>,
      required: true,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const filters = ref<ServiceCollectionFilters>({
      name: {
        field: 'name', valueString: undefined, operator: 'like',
      },
    });
    const collectionImage = useCollection<Image>(ServiceImage.loadPage, { inputCollectionData: { count: 5, filters } });

    return {
      t,
      collectionImage,
      filters,
      nameInternal: useModelWrapper<string>({
        props, emit, name: 'name',
      }),
      descriptionInternal: useModelWrapper<string>({
        props, emit, name: 'description',
      }),
      countPlayersMinInternal: useModelWrapper<number>({
        props, emit, name: 'countPlayersMin',
      }),
      countPlayersMaxInternal: useModelWrapper<number>({
        props, emit, name: 'countPlayersMax',
      }),
      minutesPlaytimeMinInternal: useModelWrapper<number>({
        props, emit, name: 'minutesPlaytimeMin',
      }),
      minutesPlaytimeMaxInternal: useModelWrapper<number>({
        props, emit, name: 'minutesPlaytimeMax',
      }),
      isCoopInternal: useModelWrapper<boolean>({
        props, emit, name: 'isCoop',
      }),
      isDigitalInternal: useModelWrapper<boolean>({
        props, emit, name: 'isDigital',
      }),
      complexityInternal: useModelWrapper<number>({
        props, emit, name: 'complexity',
      }),
      sizeInternal: useModelWrapper<number>({
        props, emit, name: 'size',
      }),
      universesInternal: useModelWrapper<Array<Universe>>({
        props, emit, name: 'universes', isEntity: true,
      }),
      categoriesInternal: useModelWrapper<Array<Category>>({
        props, emit, name: 'categories', isEntity: true,
      }),
      mechanismsInternal: useModelWrapper<Array<Mechanism>>({
        props, emit, name: 'mechanisms', isEntity: true,
      }),
      moodsInternal: useModelWrapper<Array<Mood>>({
        props, emit, name: 'moods', isEntity: true,
      }),
    };
  },
});
</script>

<style scoped>

</style>
