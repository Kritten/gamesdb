import { InputCollection } from '@backend/src/utilities/collection/collection.input';

export type ServiceCollectionLoadPageReturn<T> = Promise<{ count: number; items: T[] }>;

export interface ServiceCollectionInterface<T> {
  loadPage(data: InputCollection): ServiceCollectionLoadPageReturn<T>;
}
