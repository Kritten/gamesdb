import { computed } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ID } from '@/modules/app/utilities/entity/entity.types';

export function useModelWrapper({
  props,
  emit,
  name = 'modelValue',
  isEntity = false,
  entities = {},
}: {
  props: { [key: string]: unknown };
  emit: unknown;
  name: string;
  isEntity?: boolean;
  entities?: {};
}) {
  return computed({
    get: () => {
      if (isEntity === true) {
        if (Array.isArray(props[name])) {
          return props[name].map((entity: Entity) => entity.id);
        } else {
          return props[name]?.id;
        }
      } else {
        return props[name];
      }
    },
    set: value => {
      if (isEntity === true) {
        if (Array.isArray(value)) {
          emit(
            `update:${name}`,
            value.map((val: ID) => ({ id: val })),
          );
        } else {
          emit(`update:${name}`, entities[value]);
        }
      } else {
        emit(`update:${name}`, value);
      }
    },
  });
}

export function setDefaultIfNullOrUndefined<T>(value: T | undefined, defaultValue: T): T {
  if (value === undefined || value === null) {
    return defaultValue as T;
  } else {
    return value;
  }
}
