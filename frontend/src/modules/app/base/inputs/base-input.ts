import { computed, ComputedRef, Ref } from 'vue';
import { Validation } from '@vuelidate/core';

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

export function useBaseInput<I, E>(
  props: { validation: Validation; options: Record<string, unknown> },
  emit: (event: 'update:modelValue', ...args: unknown[]) => void,
  parseValue: (value: I | Array<I> | null) => E | Array<E> | null =
  (value) => (value as unknown) as E | Array<E> | null,
): {
  label: ComputedRef<string>;
  errorsComputed: ComputedRef<Array<string | Ref<string>>>;
  input: (value: I | Array<I> | null) => void;
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

  const input = (value: I | Array<I> | null) => {
    const valueParsed: E | Array<E> | null = parseValue(value);

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
