import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryInput, UpdateCategoryInput } from './category.input';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { GameEntityService } from '../game/game.entity.service';

@Resolver(() => Category)
export class CategoryResolver extends EntityResolver {
  constructor(
    private categoryService: CategoryService,
    private gameService: GameEntityService,
  ) {
    super();
  }

  @Query(() => [Category])
  @UseGuards(GqlAuthGuard)
  async categories() {
    return this.categoryService.find();
  }

  @Query(() => Category)
  @UseGuards(GqlAuthGuard)
  async category(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async createCategory(@Args('categoryData') categoryData: CategoryInput) {
    const category = new Category();
    category.name = categoryData.name;
    await this.handleRelation(
      'games',
      category,
      categoryData,
      this.gameService,
    );

    return await this.categoryService.create(category);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('categoryData') categoryData: UpdateCategoryInput,
  ) {
    const category = new Category();
    category.id = categoryData.id;
    category.name = categoryData.name;
    await this.handleRelation(
      'games',
      category,
      categoryData,
      this.gameService,
    );

    return await this.categoryService.update(category);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.categoryService.delete(id);
  }
}
