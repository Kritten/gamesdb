import { Ref } from 'vue';
import { Entity } from '@/modules/app/utilities/entity/entity.model';

export type InputCollectionFilter = {
    field: string;
    valueInt?: number;
    valueFloat?: number;
    valueBoolean?: boolean;
    valueString?: string;
    valueEntity?: Entity | Array<Entity>;
    valueDate?: Date;
    valueRange?: [number, number];
    operator: string;
};

export type InputCollection = {
    page: number;
    count: number | null;
    sortBy: string[];
    sortDesc: boolean[];
    filters: InputCollectionFilter[];
    leftJoins?: string[];
};

export type ServiceCollectionLoadPage<T> = { count: number; items: T[] };

export type ServiceCollectionLoadPageReturn<T> = Promise<
    ServiceCollectionLoadPage<T>
>;

export type ServiceCollectionFilters = { [key: string]: InputCollectionFilter };

export interface InputCollectionData
    extends Omit<InputCollection, 'filters' | 'sortBy' | 'sortDesc'> {
    filters: Ref<ServiceCollectionFilters>;
    sortBy: Ref<string[]>;
    sortDesc: Ref<boolean[]>;
}

export type ServiceCollectionLoadPageType<T> = (
    data: InputCollection,
    payload?: unknown
) => ServiceCollectionLoadPageReturn<T>;

export interface ServiceCollectionInterface<T> {
    loadPage(
        data: InputCollection,
        payload?: unknown
    ): ServiceCollectionLoadPageReturn<T>;
}
