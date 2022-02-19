import { Ref } from 'vue';

export type ID = string;

export type EntityLoading<T> = Ref<T | null>;

export interface EntityInterface {
    id?: ID;
}
