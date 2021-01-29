<template>
  <div>
    <slot>
      <template v-if="type === 'string'">
        <base-input-text
          v-model="value"
          :options="{
            label: t(label),
          }"
        />
      </template>
      <template v-else-if="type === 'int' || type === 'float'">
        <base-input-number
          v-model="value"
          :options="{
            label: t(label),
          }"
        />
      </template>
      <template v-else-if="type === 'boolean'">
        <base-input-boolean
          v-model="value"
          :can-be-undefined="true"
          :options="{
            label: t(label),
          }"
        />
      </template>
      <template v-else-if="type === 'select'">
        <base-input-select
          v-model="value"
          :options="{
            label: t(label),
            items,
          }"
        />
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, watch, nextTick, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import { toNumber, useId } from '@/modules/app/utilities/helpers';
import BaseInputNumber from '@/modules/app/base/inputs/base-input-number.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputSelect from '@/modules/app/base/inputs/base-input-select.vue';

export default defineComponent({
  name: 'BaseListFilter',
  components: {
    BaseInputSelect, BaseInputBoolean, BaseInputNumber, BaseInputText,
  },
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
      validator: (value) => value === 'string' || value === 'int' || value === 'float' || value === 'boolean' || value === 'select',
    },
    label: {
      required: true,
      type: String,
    },
    filterInputs: {
      required: false,
      type: Array,
      default: undefined,
    },
    items: {
      type: Array,
      required: false,
      default() {
        return [];
      },
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
      case 'select':
        nameValueField = 'valueInt';
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
      // @ts-ignore
      if (props.type === 'select') {
        valueNew = toNumber(valueNew as string);
      }

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
        return filter === undefined ? undefined : filter[nameValueField];
      },
      set(valueNew) {
        if (typeof valueNew === 'string') {
          if (valueNew.trim() === '') {
            emitValue(undefined);
            return;
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

    return {
      t,
      value,
      useId: useId(),
    };
  },
});
</script>

<style scoped>

</style>
