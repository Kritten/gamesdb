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
      v-model.number="countPlayersMinInternal"
      type="number"
    >
  </div>
  <div>
    <label for="countPlayersMax">{{ t('game.countPlayersMax') }}</label>
    <input
      id="countPlayersMax"
      v-model.number="countPlayersMaxInternal"
      type="number"
    >
  </div>
  <div>
    <label for="minutesPlaytimeMin">{{ t('game.minutesPlaytimeMin') }}</label>
    <input
      id="minutesPlaytimeMin"
      v-model.number="minutesPlaytimeMinInternal"
      type="number"
    >
  </div>
  <div>
    <label for="minutesPlaytimeMax">{{ t('game.minutesPlaytimeMax') }}</label>
    <input
      id="minutesPlaytimeMax"
      v-model.number="minutesPlaytimeMaxInternal"
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
      v-model.number="complexityInternal"
      type="number"
    >
  </div>
  <div>
    <label for="size">{{ t('game.size') }}</label>
    <input
      id="size"
      v-model.number="sizeInternal"
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
    <input
      id="images"
      v-model="filters[0].value"
    >
    <div>
      <div v-for="image in collectionImage.items.value">
        {{ image.name }} <button
          type="button"
          @click="$emit('update:images', [...images, image])"
        >
          {{ t('common.add') }}
        </button>
      </div>
    </div>
    <h3>Hinzugefügte Bilder</h3>
    <div v-for="image in images">
      {{ image.name }} <button
        type="button"
        @click="$emit('update:images', images.filter(img => img.id !== image.id))"
      >
        {{ t('common.delete') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useModelWrapper } from '@/modules/app/utilities/helpers';
import { defineComponent, ref } from 'vue';
import { useCollection } from '../app/utilities/collection/collection';
import { Image } from '../image/image.model';
import { ServiceImage } from '../image/image.service';

export default defineComponent({
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

    const filters = ref([{
      field: 'name', value: undefined, operator: 'Like',
    }]);
    const collectionImage = useCollection<Image>(ServiceImage, { count: 5, filters: filters.value });

    return {
      t,
      store,
      collectionImage,
      filters,
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
    };
  },
});
</script>

<style scoped>

</style>
