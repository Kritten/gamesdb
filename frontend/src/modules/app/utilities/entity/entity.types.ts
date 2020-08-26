import { Ref } from 'vue';

export type ID = number | string;

export interface EntityInterface {
  id?: ID;
  // [key: string]: any;
}

export interface ServiceEntityInterface<T> {
  useCreate(
    ...args: unknown
  ): {
    entity: Ref<T>;
    create(entity: T): Promise<T>;
  };
  create(entity: T): Promise<T>;

  useDelete(): {
    delete(entity: T): Promise<Boolean>;
  };
  delete(entity: T): Promise<Boolean>;
}
