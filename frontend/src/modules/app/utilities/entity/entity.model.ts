import { EntityInterface, ID } from '@/modules/app/utilities/entity/entity.types';

export class Entity implements EntityInterface {
  id?: ID;

  protected constructor(data: EntityInterface) {
    this.id = data.id;
  }

  static async convertFromServerToStore<T>(
    data: EntityInterface[],
  ): Promise<{ [key: string]: Entity }> {
    const entities: Entity[] = await Promise.all(
      data.map((item: EntityInterface) => this.parseFromServer(item)),
    );

    return entities.reduce((obj, entity) => {
      obj[entity.id as ID] = entity;
      return obj;
    }, {} as { [key: string]: Entity });
  }

  static async parseFromServer(data: EntityInterface): Promise<Entity> {
    return new this(data);
  }

  prepareForServer(): { [key: string]: unknown } {
    return { id: this.id };
  }
}
