import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { CategoryInterface } from '@/modules/category/category.types';

export class Category extends Entity implements CategoryInterface {
  name?: string;

  constructor(data: CategoryInterface = {}) {
    super(data);
    this.name = data.name;
  }
}
