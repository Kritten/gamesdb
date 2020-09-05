<template>
  <div>
    <slot>
      <label>
        {{ t(`${i18nPrefix}.filters.${name}`) }}
        <template v-if="type === 'string'">
          <input
            v-model="value"
          >
        </template>
        <template v-else-if="type === 'number'">
          <input
            v-model.number="value"
            type="number"
          >
        </template>
        <template v-else-if="type === 'boolean'">
          <input
            v-model="value"
            type="checkbox"
          >
        </template>
      </label>
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
      validator: (value): boolean => value === 'string' || value === 'number' || value === 'boolean',
    },
    i18nPrefix: {
      required: true,
      type: String,
    },
  },
  emits: ['update-filter'],
  setup(props, { emit }) {
    const { t } = useI18n();

    let nameValueField: string;
    let operator: string;

    // @ts-ignore
    switch (props.type) {
      case 'string':
        nameValueField = 'valueString';
        operator = 'like';
        break;
      case 'number':
        nameValueField = 'valueNumber';
        operator = '=';
        break;
      case 'boolean':
        nameValueField = 'valueBoolean';
        operator = '=';
        break;
      default:
        // @ts-ignore
        throw Error(`Unknown filter type ${props.type}`);
    }

    const emitValue = (valueNew: unknown) => {
      emit('update-filter', {
        // @ts-ignore
        name: props.name,
        filter: {
          // @ts-ignore
          field: props.name,
          [nameValueField]: valueNew,
          operator,
        },
      });
    };

    const value = computed({
      get() {
        // @ts-ignore
        const filter = props.filters[props.name];
        return filter === undefined ? '' : filter[nameValueField];
      },
      set(valueNew) {
        emitValue(valueNew);
      },
    });
    /**
     * Execute everytime the current filter changes to check if it has to be initialized
     */
    // @ts-ignore
    watch(() => props.filters[props.name], () => {
      // @ts-ignore
      if (props.filters[props.name] === undefined) {
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
