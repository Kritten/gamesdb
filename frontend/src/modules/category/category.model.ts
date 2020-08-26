import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { CategoryInterface } from '@/modules/category/category.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Category extends Entity implements CategoryInterface {
  name: string;

  constructor(data: CategoryInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
  }
}
