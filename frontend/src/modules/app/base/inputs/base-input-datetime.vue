<template>
  <q-input
    v-model="valueFormatted"
    v-bind="optionsMerged"
    readonly
    borderless
    :input-style="{
      width: '8rem',
    }"
  >
    <template #prepend>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="valueInternal"
            mask="YYYY-MM-DDTHH:mm"
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Close"
                color="primary"
                flat
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template #append>
      <q-icon
        name="access_time"
        class="cursor-pointer"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            v-model="valueInternal"
            mask="YYYY-MM-DDTHH:mm"
            format24h
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Close"
                color="primary"
                flat
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { format, subMinutes } from 'date-fns';
import { de } from 'date-fns/locale';
import { configBaseInput, TypeOptionsInput, useBaseInput } from '@/modules/app/base/inputs/base-input';
import { Validation } from '@vuelidate/core';

export default defineComponent({
  name: 'BaseInputDatetime',
  props: {
    modelValue: {
      type: Object as PropType<Date>,
      required: true,
    },
    validation: {
      required: false,
      type: Object as PropType<Validation>,
      default: undefined,
    },
    options: {
      required: false,
      type: Object as PropType<TypeOptionsInput>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const baseInput = useBaseInput<
      boolean | number | undefined,
      boolean | number | undefined
      >(
        props,
        emit,
      // (value) => typeof value === 'number' ? undefined : value,
      );

    const valueInternal = computed({
      // @ts-ignore
      get: () => {
        const timezoneOffsetInMinutes = props.modelValue.getTimezoneOffset();
        return subMinutes(props.modelValue, timezoneOffsetInMinutes).toISOString().substring(0, 16);
      },
      set: (value) => emit('update:modelValue', new Date(value)),
    });

    const valueFormatted = computed(() => format(
        props.modelValue as unknown as Date,
        'PPP p',
        { locale: de },
    ));

    return {
      valueInternal,
      valueFormatted,
      optionsMerged: computed(() => ({
        ...configBaseInput,
        ...props.options,
        label: baseInput.label.value,
      })),
    };
  },
});
</script>

<style scoped>

</style>
