import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Category} from "./category.entity";

@Injectable()
export class CategoryService {
  constructor() {}

  async findAll(): Promise<Category[]> {
    return await getManager().find(Category);
  }

  async create(data: Category | Category[]) {
    const categories = data instanceof Category ? [data] : data;

    const result = await getManager().save(Category, categories);

    return result instanceof Category ? result : result[0];
  }

  async update(data: Category | Category[]) {
    const categories = data instanceof Category ? [data] : data;

    const result = await getManager().save(Category, categories);

    return result instanceof Category ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Category, id);

    return result.affected > 0;
  }
}
