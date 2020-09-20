<template>
  <div>
    <label for="sortByNew">Sortieren nach</label>
    <select
      id="sortByNew"
      v-model="sortByNew"
    >
      <option
        v-for="(option, index) in optionsSortBy"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <label for="orderByNew">Absteigend</label>
    <select
      id="orderByNew"
      v-model="orderByNew"
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
      {{ data }} {{ orderBy[index] }} <button @click="removeSortBy(index)">
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
    orderBy: {
      type: Array,
      required: true,
    },
    optionsSortBy: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:sortBy', 'update:orderBy'],
  setup(props, { emit }) {
    const sortByNew = ref<string>(props.optionsSortBy[0] as string);
    const orderByNew = ref<boolean>(true);

    const addSortBy = () => {
      emit('update:sortBy', [...props.sortBy, sortByNew.value]);
      emit('update:orderBy', [...props.orderBy, orderByNew.value]);
    };

    const removeSortBy = (index: number) => {
      emit('update:sortBy', props.sortBy.filter((item, indexItem) => indexItem !== index));
      emit('update:orderBy', props.orderBy.filter((item, indexItem) => indexItem !== index));
    };

    return {
      sortByNew,
      orderByNew,
      addSortBy,
      removeSortBy,
    };
  },
});
</script>

<style scoped>

</style>
