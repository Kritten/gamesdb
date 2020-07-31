import {Category} from "./category.entity";
import {EntityService} from "../../utilities/EntityService";

export class CategoryService extends EntityService<Category> {
  constructor() {
    super(Category);
  }
}
