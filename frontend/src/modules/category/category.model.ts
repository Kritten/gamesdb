import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { CategoryInterface } from '@/modules/category/category.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class Category extends Entity implements CategoryInterface {
  name: string;

  constructor(data: CategoryInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }

  static async parseFromServer(data: EntityInterface): Promise<Category> {
    const entity = (await super.parseFromServer(data)) as Category;

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.name = this.name;

    return data;
  }
}
