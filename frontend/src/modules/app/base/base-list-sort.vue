<template>
  <div>
    <label for="sortByNew">Sortieren nach</label>
    <select
      id="sortByNew"
      v-model="sortByNew"
    >
      <option
        v-for="option in optionsSortBy"
        :key="option.field"
        :value="option.field"
      >
        {{ option.name }}
      </option>
    </select>
    <label for="sortDescNew">Absteigend</label>
    <select
      id="sortDescNew"
      v-model="sortDescNew"
    >
      <option
        v-for="(option, index) in [true, false]"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
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
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseListSort',
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
      emit('update:sortDesc', [...props.sortDesc, sortDescNew.value]);
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
    };
  },
});
</script>

<style scoped>

</style>
