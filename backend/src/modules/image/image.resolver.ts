import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { ImageEntityService } from './image.entity.service';
import { ImageInput, UpdateImageInput } from './image.input';
import { EntityResolver } from '../../utilities/entity/entity.resolver';
import { GameEntityService } from '../game/game.entity.service';
import { Image } from './image.entity';
import { InputCollection } from '../../utilities/collection/collection.input';
import { ImageCollectionService } from './collection/image.collection.service';
import { ImageCollectionData } from './collection/image.collectionData';
import { WishlistEntityService } from '../wishlist/wishlist.entity.service';

@Resolver(() => Image)
export class ImageResolver extends EntityResolver {
  constructor(
    private imageService: ImageEntityService,
    private imageCollectionService: ImageCollectionService,
    private gameService: GameEntityService,
    private wishlistService: WishlistEntityService,
  ) {
    super();
  }

  @Query(() => ImageCollectionData)
  @UseGuards(GqlAuthGuard)
  async images(@Args('imageData') data: InputCollection) {
    return this.imageCollectionService.loadPage(data);
  }

  @Query(() => Image)
  @UseGuards(GqlAuthGuard)
  async image(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.imageService.findOne(parseInt(id, 10));
  }

  @Mutation(() => Image)
  @UseGuards(GqlAuthGuard)
  async createImage(@Args('imageData') imageData: ImageInput) {
    const image = new Image();
    image.name = imageData.name;
    image.link = imageData.link;
    await this.handleRelation('games', image, imageData, this.gameService);
    await this.handleRelation(
      'wishlists',
      image,
      imageData,
      this.wishlistService,
    );

    return await this.imageService.create(image);
  }

  @Mutation(() => Image)
  @UseGuards(GqlAuthGuard)
  async updateImage(@Args('imageData') imageData: UpdateImageInput) {
    const image = new Image();
    image.id = parseInt(imageData.id, 10);
    image.name = imageData.name;
    image.link = imageData.link;
    await this.handleRelation('games', image, imageData, this.gameService);
    await this.handleRelation(
      'wishlists',
      image,
      imageData,
      this.wishlistService,
    );

    return await this.imageService.update(image);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteImage(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.imageService.delete(parseInt(id, 10));
  }
}
