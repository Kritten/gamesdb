<template>
  <div>
    <base-input-select
      v-model="sortByNew"
      :options="{
        label: 'Sortieren nach',
        items: optionsSortByPrepared,
      }"
    />

    <base-input-select
      v-model="sortDescNew"
      :options="{
        label: 'Absteigend',
        items: [
          {key: true, text: true},
          {key: false, text: false},
        ],
      }"
    />

    <button @click="addSortBy">
      Hinzufügen
    </button>
  </div>
  <div>
    <div
      v-for="(data, index) in sortBy"
      :key="index"
    >
      {{ data }} {{ sortDesc[index] }} <button @click="removeSortBy(index)">
        Löschen
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';

export default defineComponent({
  name: 'BaseListSort',
  components: { BaseInputSelect },
  props: {
    sortBy: {
      type: Array,
      required: true,
    },
    sortDesc: {
      type: Array,
      required: true,
    },
    optionsSortBy: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:sortBy', 'update:sortDesc'],
  setup(props, { emit }) {
    // @ts-ignore
    const sortByNew = ref<string>(props.optionsSortBy[0].field);
    const sortDescNew = ref<boolean>(true);

    const addSortBy = () => {
      emit('update:sortBy', [...props.sortBy, sortByNew.value]);
      // @ts-ignore
      emit('update:sortDesc', [...props.sortDesc, sortDescNew.value === 'true']);
    };

    const removeSortBy = (index: number) => {
      emit('update:sortBy', props.sortBy.filter((item, indexItem) => indexItem !== index));
      emit('update:sortDesc', props.sortDesc.filter((item, indexItem) => indexItem !== index));
    };

    return {
      sortByNew,
      sortDescNew,
      addSortBy,
      removeSortBy,
      // @ts-ignore
      optionsSortByPrepared: computed(() => props.optionsSortBy.map((value) => ({ key: value.field, text: value.name }))),
    };
  },
});
</script>

<style scoped>

</style>
