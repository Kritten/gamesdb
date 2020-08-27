<template>
  <div>
    <label for="name">{{ t('game.name') }}</label>
    <input
      id="name"
      :value="name"
      @input="$emit('update:name', $event.target.value)"
    >
  </div>
  <div>
    <label for="description">{{ t('game.description') }}</label>
    <textarea
      id="description"
      :value="description"
      cols="100"
      rows="5"
      @input="$emit('update:description', $event.target.value)"
    />
  </div>
  <div>
    <label for="countPlayersMin">{{ t('game.countPlayersMin') }}</label>
    <input
      id="countPlayersMin"
      :value="countPlayersMin"
      type="number"
      @input="$emit('update:countPlayersMin', parseFloat($event.target.value))"
    >
  </div>
  <div>
    <label for="countPlayersMax">{{ t('game.countPlayersMax') }}</label>
    <input
      id="countPlayersMax"
      :value="countPlayersMax"
      type="number"
      @input="$emit('update:countPlayersMax', parseFloat($event.target.value))"
    >
  </div>
  <div>
    <label for="minutesPlaytimeMin">{{ t('game.minutesPlaytimeMin') }}</label>
    <input
      id="minutesPlaytimeMin"
      :value="minutesPlaytimeMin"
      type="number"
      @input="$emit('update:minutesPlaytimeMin', parseFloat($event.target.value))"
    >
  </div>
  <div>
    <label for="minutesPlaytimeMax">{{ t('game.minutesPlaytimeMax') }}</label>
    <input
      id="minutesPlaytimeMax"
      :value="minutesPlaytimeMax"
      type="number"
      @input="$emit('update:minutesPlaytimeMax', parseFloat($event.target.value))"
    >
  </div>
  <div>
    <label for="isCoop">{{ t('game.isCoop') }}</label>
    <input
      id="isCoop"
      :value="isCoop"
      type="checkbox"
      @input="$emit('update:isCoop', $event.target.value)"
    >
  </div>
  <div>
    <label for="complexity">{{ t('game.complexity') }}</label>
    <input
      id="complexity"
      :value="complexity"
      type="number"
      @input="$emit('update:complexity', parseFloat($event.target.value))"
    >
  </div>
  <div>
    <label for="size">{{ t('game.size') }}</label>
    <input
      id="size"
      :value="size"
      type="number"
      @input="$emit('update:size', parseFloat($event.target.value))"
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
