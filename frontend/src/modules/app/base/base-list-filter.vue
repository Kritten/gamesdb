<template>
  <div>
    <slot>
      <template v-if="type === 'string'">
        <label>
          {{ t(`${i18nPrefix}.filters.${name}`) }}
          <input
            v-model="value"
          >
        </label>
      </template>
      <template v-else-if="type === 'int' || type === 'float'">
        <label>
          {{ t(`${i18nPrefix}.filters.${name}`) }}
          <input
            v-model.number="value"
            type="number"
          >
        </label>
      </template>
      <template v-else-if="type === 'boolean'">
        <div>
          {{ t(`${i18nPrefix}.filters.${name}`) }}
        </div>
        <label>
          <input
            v-model="value"
            :name="name"
            :value="true"
            type="radio"
          >
          {{ t('common.yes') }}
        </label>
        <label>
          <input
            v-model="value"
            :name="name"
            :value="false"
            type="radio"
          >
          {{ t('common.no') }}
        </label>
        <label>
          <input
            v-model="value"
            :name="name"
            :value="undefined"
            type="radio"
          >
          {{ t('common.undefined') }}
        </label>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, watch, nextTick, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BaseListFilter',
  props: {
    filters: {
      required: true,
      type: Object,
    },
    name: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      validator: (value) => value === 'string' || value === 'int' || value === 'float' || value === 'boolean',
    },
    i18nPrefix: {
      required: true,
      type: String,
    },
    filterInputs: {
      required: false,
      type: Array,
      default: undefined,
    },
  },
  emits: ['update-filter'],
  setup(props, { emit }) {
    const { t } = useI18n();

    let nameValueField: string;
    // @ts-ignore
    let nameField: string[] = [props.name];
    let operator: string[] = [];

    // @ts-ignore
    switch (props.type) {
      case 'string':
        nameValueField = 'valueString';
        operator.push('like');
        break;
      case 'int':
        nameValueField = 'valueInt';
        operator.push('=');
        break;
      case 'float':
        nameValueField = 'valueFloat';
        operator.push('=');
        break;
      case 'boolean':
        nameValueField = 'valueBoolean';
        operator.push('=');
        break;
      default:
        // @ts-ignore
        throw Error(`Unknown filter type ${props.type}`);
    }

    // @ts-ignore
    if (props.filterInputs !== undefined) {
      // @ts-ignore
      nameField = props.filterInputs.map((filter) => filter.name);
      // @ts-ignore
      operator = props.filterInputs.map((filter) => filter.operator);
    }

    const emitValue = (valueNew: unknown) => {
      const payload: {[key:string]: {}} = {};

      for (let i = 0; i < operator.length; i += 1) {
        payload[nameField[i]] = {
          // @ts-ignore
          field: nameField[i],
          [nameValueField]: valueNew,
          operator: operator[i],
        };
      }

      emit('update-filter', payload);
    };

    const value = computed({
      get() {
        // @ts-ignore
        const filter = props.filters[nameField[0]];
        return filter === undefined ? '' : filter[nameValueField];
      },
      set(valueNew) {
        if (typeof valueNew === 'string') {
          if (valueNew.trim() === '') {
            emitValue(undefined);
          }
        }
        emitValue(valueNew);
      },
    });
    /**
     * Execute everytime the current filter changes to check if it has to be initialized
     */
    // @ts-ignore
    watch(() => props.filters[nameField[0]], () => {
      // @ts-ignore
      if (props.filters[nameField[0]] === undefined) {
        nextTick(() => {
          emitValue(undefined);
        });
      }
    }, { deep: true, immediate: true });

    return { t, value };
  },
});
</script>

<style scoped>

</style>
