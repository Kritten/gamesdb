<template>
  <div class="row">
    <div class="col">
      <q-card>
        <q-card-section>
          <div class="row items-center q-col-gutter-md">
            <div class="col">
              <div class="text-h6">
                {{ t('sort.label') }}
              </div>
            </div>
            <div
              class="col-shrink"
              style="min-width: 200px"
            >
              <base-input-select
                v-model="sortBySingle"
                :options="{
                  label: 'Sortieren nach',
                  items: optionsSortByPrepared,
                  emitValue: true,
                  mapOptions: true,
                  hideBottomSpace: true,
                }"
              />
            </div>
            <div class="col-shrink">
              <base-input-boolean
                v-model="sortDescSingle"
                :options="{
                  label: 'Absteigend',
                }"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
<!--  <div class="row">-->
<!--    {{ sortBy }}-->
<!--    <div class="col">-->
<!--      <base-input-select-->
<!--        v-model="sortByNew"-->
<!--        :options="{-->
<!--          label: 'Sortieren nach',-->
<!--          items: optionsSortByPrepared,-->
<!--        }"-->
<!--      />-->
<!--    </div>-->
<!--    <div class="col">-->
<!--      <base-input-select-->
<!--        v-model="sortDescNew"-->
<!--        :options="{-->
<!--          label: 'Absteigend',-->
<!--          items: [-->
<!--            {key: true, text: true},-->
<!--            {key: false, text: false},-->
<!--          ],-->
<!--        }"-->
<!--      />-->
<!--    </div>-->
<!--    <div class="col">-->
<!--      <button @click="addSortBy">-->
<!--        Hinzufügen-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div>-->
<!--    <div-->
<!--      v-for="(data, index) in sortBy"-->
<!--      :key="index"-->
<!--    >-->
<!--      {{ data }} {{ sortDesc[index] }} <button @click="removeSortBy(index)">-->
<!--        Löschen-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, PropType,
} from 'vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';
import { useI18n } from 'vue-i18n';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';

export default defineComponent({
  name: 'BaseListSort',
  components: { BaseInputBoolean, BaseInputSelect },
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
      type: Array as PropType<Array<{field: string, name: string}>>,
      required: true,
    },
  },
  emits: ['update:sortBy', 'update:sortDesc'],
  setup(props, { emit }) {
    const { t } = useI18n();
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

    const sortBySingle = computed({
      get: () => props.sortBy[0],
      set: (value) => {
        emit('update:sortBy', [value]);
      },
    });

    const sortDescSingle = computed({
      get: () => props.sortDesc[0],
      set: (value) => {
        emit('update:sortDesc', [value]);
      },
    });

    // const updateSortBySingle = (index: number) => {
    //   emit('update:sortBy', props.sortBy.filter((item, indexItem) => indexItem !== index));
    //   // emit('update:sortDesc', props.sortDesc.filter((item, indexItem) => indexItem !== index));
    // };

    return {
      t,
      sortByNew,
      sortDescNew,
      addSortBy,
      removeSortBy,
      sortBySingle,
      sortDescSingle,
      // @ts-ignore
      optionsSortByPrepared: computed(() => props.optionsSortBy.map((value) => ({ value: value.field, label: value.name }))),
    };
  },
});
</script>

<style scoped>

</style>
