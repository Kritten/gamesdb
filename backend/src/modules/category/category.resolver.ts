import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import {Category} from "./category.entity";
import {CategoryService} from "./category.service";
import {CategoryInput, UpdateCategoryInput} from "./category.input";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {
  }

  @Query(() => [Category])
  @UseGuards(GqlAuthGuard)
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(@Args('categoryData') categoryData: CategoryInput) {
    const category = new Category();
    category.name = categoryData.name;
    //TODO relations
    return await this.categoryService.create(category);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(@Args('categoryData') categoryData: UpdateCategoryInput) {
    const category = new Category();
    category.id = categoryData.id;
    category.name = categoryData.name;
    //TODO relations
    return await this.categoryService.update(category);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(@Args({name: 'id', type: () => Int}) idCategory: number) {
    return await this.categoryService.delete(idCategory);
  }
}
