import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class Entity implements EntityInterface {
  id?: number;

  protected constructor(data: EntityInterface) {
    this.id = data.id;
  }

  static convertFromServerToStore<T>(data: EntityInterface[]): { [key: number]: Entity } {
    const entities: Entity[] = data.map((item: EntityInterface) => this.parseFromServer(item));

    return entities.reduce((obj, entity) => {
      obj[entity.id as number] = entity;
      return obj;
    }, {} as { [key: number]: Entity });
  }

  static parseFromServer(data: EntityInterface): Entity {
    return new this(data);
  }
}
