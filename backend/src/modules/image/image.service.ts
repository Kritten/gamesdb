import { Image } from './image.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class ImageService extends EntityService<Image> {
  constructor() {
    super(Image, { relations: ['games'] });
  }
}
