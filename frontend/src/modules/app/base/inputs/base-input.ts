import { computed, ComputedRef, Ref } from 'vue';
import { Validation } from '@vuelidate/core';

export type TypeOptionsInput = {
  label: string,
  dense?: boolean,
  [key: string]: unknown,
};

export const configBaseInput = {};

export function useBaseInput<I, E>(
  props: { validation: Validation; options: Record<string, unknown> },
  emit: (event: 'update:modelValue', ...args: unknown[]) => void,
  parseValue: (value: I) => E = (value) => (value as unknown) as E,
): {
  label: ComputedRef<string>;
  errorsComputed: ComputedRef<Array<string | Ref<string>>>;
  input: (value: I) => void;
} {
  const hasValidationInfo = computed(() => props.validation !== undefined);

  const isRequired = computed(() => {
    if (hasValidationInfo.value) {
      return props.validation.required !== undefined;
    }
    return false;
  });

  const errorsComputed = computed<Array<string | Ref<string>>>(
    () => (hasValidationInfo.value ? props.validation.$errors.map((error) => error.$message) : []),
  );

  const labelInternal = computed<string>(() => {
    let { label }: { label?: string } = props.options;

    if (label === undefined) {
      throw Error("Option 'label' is missing");
    }

    if (isRequired.value) {
      label += ' (required)';
    }
    return label;
  });

  const input = (value: I) => {
    const valueParsed: E = parseValue(value);

    emit('update:modelValue', valueParsed);

    if (hasValidationInfo.value) {
      props.validation.$touch();
    }
  };

  return {
    label: labelInternal,
    errorsComputed,
    input,
    // styles: {
    //   // 'margin-top': '0.7rem',
    // },
  };
}
