import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Category } from './category.entity';
import { CategoryInput, UpdateCategoryInput } from './category.input';
import {PrismaService} from "../../utilities/collection/prisma.service";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => [Category])
  @UseGuards(GqlAuthGuard)
  async categories() {
    return this.prismaService.category.findMany();
  }

  @Query(() => Category)
  @UseGuards(GqlAuthGuard)
  async category(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.prismaService.category.findUnique({
      where: {
        id: parseInt(id, 10),
      }
    });
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(@Args('categoryData') categoryData: CategoryInput) {
    return this.prismaService.category.create({
      data: {
        name: categoryData.name
      }
    });
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('categoryData') categoryData: UpdateCategoryInput,
  ) {
    return this.prismaService.category.update({
      where: { id: parseInt(categoryData.id, 10) },
      data: {
        name: categoryData.name
      }
    });

    // const category = new Category();
    // category.id = parseInt(categoryData.id, 10);
    // category.name = categoryData.name;
    // await this.handleRelation(
    //   'games',
    //   category,
    //   categoryData,
    //   this.gameService,
    // );
    //
    // return await this.categoryService.update(category);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.category.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
