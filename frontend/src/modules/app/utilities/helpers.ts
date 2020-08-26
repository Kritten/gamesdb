import { computed } from 'vue';

export function useModelWrapper(props: {}, emit: () => {}, name: string = 'modelValue') {
  return computed({
    get: () => props[name],
    set: value => emit(`update:${name}`, value),
  });
}
