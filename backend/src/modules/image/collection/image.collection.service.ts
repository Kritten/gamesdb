import { CollectionService } from '../../../utilities/collection/collection.service';
import { Injectable } from '@nestjs/common';
import { Image } from '../image.entity';
import { ImageEntityService } from '../image.entity.service';

@Injectable()
export class ImageCollectionService extends CollectionService<Image> {
  constructor(private imageEntityService: ImageEntityService) {
    super(Image, imageEntityService);
  }
}
