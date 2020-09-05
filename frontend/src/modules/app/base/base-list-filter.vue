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
        <label>
          <input
            v-model="value"
            :name="name"
            :value="true"
            type="radio"
          >
          {{ t(`${i18nPrefix}.filters.${name}.true`) }}
        </label>
        <label>
          <input
            v-model="value"
            :name="name"
            :value="false"
            type="radio"
          >
          {{ t(`${i18nPrefix}.filters.${name}.false`) }}
        </label>
        <label>
          <input
            v-model="value"
            :name="name"
            :value="undefined"
            type="radio"
          >
          {{ t(`${i18nPrefix}.filters.${name}.undefined`) }}
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
    operator: {
      required: false,
      validator: (value) => value === 'like' || value === '=' || value === '>' || value === '<' || value === '>=' || value === '<=',
      default: undefined,
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
      case 'int':
        nameValueField = 'valueInt';
        operator = '=';
        break;
      case 'float':
        nameValueField = 'valueFloat';
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

    // @ts-ignore
    if (props.operator !== undefined) {
      // @ts-ignore
      operator = props.operator;
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
        if (typeof valueNew === 'string') {
          if (valueNew.trim() === '') {
            valueNew = undefined;
          }
        }
        console.warn(valueNew, 'valueNew');
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
