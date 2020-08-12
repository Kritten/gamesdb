import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { ImageService } from './image.service';
import { ImageInput, UpdateImageInput } from './image.input';
import { EntityResolver } from '../../utilities/entity.resolver';
import { GameService } from '../game/game.service';
import { Image } from './image.entity';

@Resolver(() => Image)
export class ImageResolver extends EntityResolver {
  constructor(
    private imageService: ImageService,
    private gameService: GameService,
  ) {
    super();
  }

  @Query(() => [Image])
  @UseGuards(GqlAuthGuard)
  async images() {
    return this.imageService.find();
  }

  @Query(() => Image)
  @UseGuards(GqlAuthGuard)
  async image(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.imageService.findOne(id);
  }

  @Mutation(() => Image)
  @UseGuards(GqlAuthGuard)
  async createImage(@Args('imageData') imageData: ImageInput) {
    const image = new Image();
    image.name = imageData.name;
    image.link = imageData.link;
    await this.handleRelation('games', image, imageData, this.gameService);

    return await this.imageService.create(image);
  }

  @Mutation(() => Image)
  @UseGuards(GqlAuthGuard)
  async updateImage(@Args('imageData') imageData: UpdateImageInput) {
    const image = new Image();
    image.id = imageData.id;
    image.name = imageData.name;
    image.link = imageData.link;
    await this.handleRelation('games', image, imageData, this.gameService);

    return await this.imageService.update(image);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteImage(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.imageService.delete(id);
  }
}
