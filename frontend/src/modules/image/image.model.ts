import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ImageInterface } from '@/modules/image/image.types';

export class Image extends Entity implements ImageInterface {
  name?: string;

  link?: string;

  constructor(data: ImageInterface = {}) {
    super(data);
    this.name = data.name;
    this.link = data.link;
  }
}
