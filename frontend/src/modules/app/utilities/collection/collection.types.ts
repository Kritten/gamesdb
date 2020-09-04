import { InputCollection } from '@backend/src/utilities/collection/collection.input';

export type ServiceCollectionLoadPageReturn<T> = Promise<{ count: number; items: T[] }>;

export type ServiceCollectionLoadPageType<T> = (
  data: InputCollection,
  payload?: unknown,
) => ServiceCollectionLoadPageReturn<T>;

export interface ServiceCollectionInterface<T> {
  loadPage(data: InputCollection, payload?: unknown): ServiceCollectionLoadPageReturn<T>;
}
