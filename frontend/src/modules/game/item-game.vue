<template>
  <div>
    <label for="name">{{ t('game.name') }}</label>
    <input
      id="name"
      v-model="nameInternal"
    >
  </div>
  <div>
    <label for="description">{{ t('game.description') }}</label>
    <textarea
      id="description"
      v-model="descriptionInternal"
      cols="100"
      rows="5"
    />
  </div>
  <div>
    <label for="countPlayersMin">{{ t('game.countPlayersMin') }}</label>
    <input
      id="countPlayersMin"
      v-model="countPlayersMinInternal"
      type="number"
    >
  </div>
  <div>
    <label for="countPlayersMax">{{ t('game.countPlayersMax') }}</label>
    <input
      id="countPlayersMax"
      v-model="countPlayersMaxInternal"
      type="number"
    >
  </div>
  <div>
    <label for="minutesPlaytimeMin">{{ t('game.minutesPlaytimeMin') }}</label>
    <input
      id="minutesPlaytimeMin"
      v-model="minutesPlaytimeMinInternal"
      type="number"
    >
  </div>
  <div>
    <label for="minutesPlaytimeMax">{{ t('game.minutesPlaytimeMax') }}</label>
    <input
      id="minutesPlaytimeMax"
      v-model="minutesPlaytimeMaxInternal"
      type="number"
    >
  </div>
  <div>
    <label for="isCoop">{{ t('game.isCoop') }}</label>
    <input
      id="isCoop"
      v-model="isCoopInternal"
      type="checkbox"
    >
  </div>
  <div>
    <label for="complexity">{{ t('game.complexity') }}</label>
    <input
      id="complexity"
      v-model="complexityInternal"
      type="number"
    >
  </div>
  <div>
    <label for="size">{{ t('game.size') }}</label>
    <input
      id="size"
      v-model="sizeInternal"
      type="number"
    >
  </div>
  <div>
    <label for="universes">{{ t('universe.label', 2) }}</label>
    <select
      id="universes"
      v-model="universesInternal"
      multiple
    >
      <option
        v-for="universe in store.state.moduleUniverse.universes"
        :key="universe.id"
        :value="universe.id"
      >
        {{ universe.name }}
      </option>
    </select>
  </div>
  <div>
    <label for="categories">{{ t('category.label', 2) }}</label>
    <select
      id="categories"
      v-model="categoriesInternal"
      multiple
    >
      <option
        v-for="category in store.state.moduleCategory.categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
  <div>
    <label for="mechanisms">{{ t('mechanism.label', 2) }}</label>
    <select
      id="mechanisms"
      v-model="mechanismsInternal"
      multiple
    >
      <option
        v-for="mechanism in store.state.moduleMechanism.mechanisms"
        :key="mechanism.id"
        :value="mechanism.id"
      >
        {{ mechanism.name }}
      </option>
    </select>
  </div>
  <div>
    <label for="moods">{{ t('mood.label', 2) }}</label>
    <select
      id="moods"
      v-model="moodsInternal"
      multiple
    >
      <option
        v-for="mood in store.state.moduleMood.moods"
        :key="mood.id"
        :value="mood.id"
      >
        {{ mood.name }}
      </option>
    </select>
  </div>
  <div>
    <label for="images">{{ t('image.label', 2) }}</label>
    <select
      id="images"
      v-model="imagesInternal"
      multiple
    >
      <option
        v-for="image in store.state.moduleImage.images"
        :key="image.id"
        :value="image.id"
      >
        {{ image.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useModelWrapper } from '@/modules/app/utilities/helpers';

export default {
  name: 'ItemGame',
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
      type: Number,
      required: true,
    },
    countPlayersMax: {
      type: Number,
      required: true,
    },
    minutesPlaytimeMin: {
      type: Number,
      required: true,
    },
    minutesPlaytimeMax: {
      type: Number,
      required: true,
    },
    isCoop: {
      type: Boolean,
      required: true,
    },
    complexity: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    universes: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    mechanisms: {
      type: Array,
      required: true,
    },
    moods: {
      type: Array,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();

    return {
      t,
      store,
      nameInternal: useModelWrapper({
        props, emit, name: 'name',
      }),
      descriptionInternal: useModelWrapper({
        props, emit, name: 'description',
      }),
      countPlayersMinInternal: useModelWrapper({
        props, emit, name: 'countPlayersMin',
      }),
      countPlayersMaxInternal: useModelWrapper({
        props, emit, name: 'countPlayersMax',
      }),
      minutesPlaytimeMinInternal: useModelWrapper({
        props, emit, name: 'minutesPlaytimeMin',
      }),
      minutesPlaytimeMaxInternal: useModelWrapper({
        props, emit, name: 'minutesPlaytimeMax',
      }),
      isCoopInternal: useModelWrapper({
        props, emit, name: 'isCoop',
      }),
      complexityInternal: useModelWrapper({
        props, emit, name: 'complexity',
      }),
      sizeInternal: useModelWrapper({
        props, emit, name: 'size',
      }),
      universesInternal: useModelWrapper({
        props, emit, name: 'universes', isEntity: true,
      }),
      categoriesInternal: useModelWrapper({
        props, emit, name: 'categories', isEntity: true,
      }),
      mechanismsInternal: useModelWrapper({
        props, emit, name: 'mechanisms', isEntity: true,
      }),
      moodsInternal: useModelWrapper({
        props, emit, name: 'moods', isEntity: true,
      }),
      imagesInternal: useModelWrapper({
        props, emit, name: 'images', isEntity: true,
      }),
    };
  },
};
</script>

<style scoped>

</style>
