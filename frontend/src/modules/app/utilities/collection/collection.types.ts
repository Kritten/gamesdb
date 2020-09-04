import {
  InputCollection,
  InputCollectionFilter,
} from '@backend/src/utilities/collection/collection.input';

export type ServiceCollectionLoadPageReturn<T> = Promise<{ count: number; items: T[] }>;

export interface InputCollectionData extends Omit<InputCollection, 'filters'> {
  filters: { [key: string]: InputCollectionFilter };
}

export type ServiceCollectionLoadPageType<T> = (
  data: InputCollection,
  payload?: unknown,
) => ServiceCollectionLoadPageReturn<T>;

export interface ServiceCollectionInterface<T> {
  loadPage(data: InputCollection, payload?: unknown): ServiceCollectionLoadPageReturn<T>;
}

export type ServiceCollectionFilters = { [key: string]: InputCollectionFilter };
