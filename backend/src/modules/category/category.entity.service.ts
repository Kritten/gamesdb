import { Category } from './category.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class CategoryEntityService extends EntityService<Category> {
  constructor() {
    super(Category, { relations: ['games'] });
  }
}
