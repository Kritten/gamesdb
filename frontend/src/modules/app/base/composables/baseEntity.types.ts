import { Ref } from 'vue';
import { DocumentNode } from 'graphql';
import { EntityInterface, ID } from '@/modules/app/utilities/entity/entity.types';

export type TypeBaseUseEntitySetEntities<T> = (entitesPassed: Record<ID, T>) => void;
export type TypeBaseUseEntitySetEntity<T> = (entitesPassed: T) => void;
export type TypeBaseUseEntityDeleteEntiy<T> = (entitesPassed: T) => void;

export type TypeBaseUseEntityParameters<T> = {
  entities: Ref<Record<ID, T>>
}

export type TypeBaseUseCreateEntityParameters<T, P> = {
  setEntity: TypeBaseUseEntitySetEntity<T>
  cls: { new(): T, parseFromServer: (data: EntityInterface) => Promise<T> },
  mutation: DocumentNode,
  nameMutation: keyof P,
  nameVariable: string,
}

export type TypeBaseUseUpdateEntityParameters<T, P> = {
  entityPassed: T,
  cls: { new(): T, parseFromServer: (data: EntityInterface) => Promise<T> },
  setEntity: TypeBaseUseEntitySetEntity<T>,
  mutation: DocumentNode,
  nameMutation: keyof P,
  nameVariable: string,
}

export type TypeBaseUseDeleteEntityParameters<T> = {
  deleteEntity: TypeBaseUseEntityDeleteEntiy<T>,
  mutation: DocumentNode,
}

export type TypeBaseUseEntity<T> = (data: TypeBaseUseEntityParameters<T>) => {
  setEntities: TypeBaseUseEntitySetEntities<T>;
  setEntity: TypeBaseUseEntitySetEntity<T>;
  deleteEntity: TypeBaseUseEntityDeleteEntiy<T>;
}
