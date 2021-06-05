import {
  computed, ComputedRef, ref, Ref, watch, isRef,
} from 'vue';
import { ErrorObject, Validation } from '@vuelidate/core';
import { useI18n } from 'vue-i18n';

export type TypeOptionsInput = {
  label: string,
  dense?: boolean,
  inputDebounce?: number,
  [key: string]: unknown,
};

export type TypeOptionsInputSelect = TypeOptionsInput & {
  items: Array<Record<string, unknown>>,
};

export const configBaseInput = {
  dense: true,
};

const translate = (errorObject: ErrorObject, t: (value: string) => string) => ({
  ...errorObject,
  $message: t(`validator.${errorObject.$validator}`),

});

export function useBaseInput<I, E>(
  props: { validation?: Validation; options: Record<string, unknown> },
  emit: (event: 'update:modelValue', ...args: unknown[]) => void,
  parseValue: (value: I | Array<I> | null) => E | Array<E> | null =
  (value) => (value as unknown) as E | Array<E> | null,
): {
  label: ComputedRef<string>;
  errorMessage: Ref<string>;
  input: (value: I | Array<I> | null) => void;
} {
  const { t } = useI18n();

  const hasValidationInfo = computed(() => props.validation !== undefined);

  const isRequired = computed(() => {
    if (hasValidationInfo.value) {
      return props.validation?.required !== undefined;
    }
    return false;
  });

  /**
   * Validation
   */
  const errorMessage = ref<string>('');

  if (hasValidationInfo.value) {
    watch(computed(() => props.validation?.$errors), (value) => {
      if (value === undefined) {
        return;
      }
      if (value.length > 0) {
        const validation = translate(value[0], t);
        errorMessage.value = validation.$message;
        return;
      }

      errorMessage.value = '';
    });
  }

  /**
   * Label
   */

  const labelInternal = computed<string>(() => {
    let { label }: { label?: string } = props.options;

    if (label === undefined) {
      throw Error("Option 'label' is missing");
    }

    if (isRequired.value) {
      label += ` (${t('common.required')})`;
    }
    return label;
  });

  const input = (value: I | Array<I> | null) => {
    const valueParsed: E | Array<E> | null = parseValue(value);

    emit('update:modelValue', valueParsed);

    if (hasValidationInfo.value) {
      props.validation?.$touch();
    }
  };

  return {
    label: labelInternal,
    input,
    errorMessage,
    // styles: {
    //   // 'margin-top': '0.7rem',
    // },
  };
}
