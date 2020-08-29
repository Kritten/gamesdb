import { computed } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export function useModelWrapper({
  props,
  emit,
  name = 'modelValue',
  isEntity = false,
  entities = {},
}: {
  props: { [key: string]: Entity | Entity[] | unknown };
  emit: (event: string, ...args: any[]) => void;
  name: string;
  isEntity?: boolean;
  entities?: { [key: string]: unknown };
}) {
  return computed({
    get: () => {
      if (isEntity === true) {
        if (Array.isArray(props[name])) {
          return (props[name] as Entity[]).map((entity: Entity) => entity.id);
        } else {
          return (props[name] as Entity)?.id;
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
            value.map((val: string) => ({ id: val })),
          );
        } else {
          emit(`update:${name}`, entities[value as string]);
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
