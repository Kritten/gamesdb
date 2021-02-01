import { Ref } from 'vue';

export type InputCollectionFilter = {
  field: string;
  valueInt?: number;
  valueFloat?: number;
  valueBoolean?: boolean;
  valueString?: string;
  valueDate?: Date;
  valueRange?: [number, number];
  operator: string;
};

export type InputCollection = {
  page: number;
  count?: number;
  sortBy: string[];
  sortDesc: boolean[];
  filters: InputCollectionFilter[];
  leftJoins?: string[];
};

export type ServiceCollectionLoadPageReturn<T> = Promise<{ count: number; items: T[] }>;

export type ServiceCollectionFilters = { [key: string]: InputCollectionFilter };

export interface InputCollectionData
  extends Omit<InputCollection, 'filters' | 'sortBy' | 'sortDesc'> {
  filters: Ref<ServiceCollectionFilters>;
  sortBy: Ref<string[]>;
  sortDesc: Ref<boolean[]>;
}

export type ServiceCollectionLoadPageType<T> = (
  data: InputCollection,
  payload?: unknown,
) => ServiceCollectionLoadPageReturn<T>;

export interface ServiceCollectionInterface<T> {
  loadPage(data: InputCollection, payload?: unknown): ServiceCollectionLoadPageReturn<T>;
}
