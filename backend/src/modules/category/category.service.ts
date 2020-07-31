import { getManager } from 'typeorm';
import {Category} from "./category.entity";
import {EntityService} from "../../utilities/EntityService";

export class CategoryService extends EntityService<Category> {
  constructor() {
    super();
    this.entityClass = Category;
  }

  async findAll(): Promise<Category[]> {
    return await getManager().find(Category, {
      relations: ['games'],
    });
  }
}
