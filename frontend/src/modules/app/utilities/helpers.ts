import { computed } from 'vue';

export function useModelWrapper(props: {}, emit: () => {}, name: string = 'modelValue') {
  return computed({
    get: () => props[name],
    set: value => emit(`update:${name}`, value),
  });
}

export function setDefaultIfNullOrUndefined<T>(value: T | undefined, defaultValue: T): T {
  if (value === undefined || value === null) {
    return defaultValue as T;
  } else {
    return value;
  }
}
