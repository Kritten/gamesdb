import {Category} from "./category.entity";
import {EntityService} from "../../utilities/entity.service";

export class CategoryService extends EntityService<Category> {
  constructor() {
    super(Category);
  }
}
