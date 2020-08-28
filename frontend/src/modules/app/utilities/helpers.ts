import { computed } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ID } from '@/modules/app/utilities/entity/entity.types';

export function useModelWrapper({
  props,
  emit,
  name = 'modelValue',
  isEntity = false,
}: {
  props: { [key: string]: unknown };
  emit: unknown;
  name: string;
  isEntity?: boolean;
}) {
  return computed({
    get: () => (isEntity ? props[name].map((entity: Entity) => entity.id) : props[name]),
    set: value =>
      isEntity
        ? emit(
            `update:${name}`,
            value.map((val: ID) => ({ id: val })),
          )
        : emit(`update:${name}`, value),
  });
}

export function setDefaultIfNullOrUndefined<T>(value: T | undefined, defaultValue: T): T {
  if (value === undefined || value === null) {
    return defaultValue as T;
  } else {
    return value;
  }
}
