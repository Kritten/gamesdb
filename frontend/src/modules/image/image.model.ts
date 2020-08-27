import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ImageInterface } from '@/modules/image/image.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export class Image extends Entity implements ImageInterface {
  name: string;

  link: string;

  constructor(data: ImageInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    this.link = setDefaultIfNullOrUndefined<string>(data.link, '');
  }

  static async parseFromServer(data: EntityInterface): Promise<Image> {
    return (await super.parseFromServer(data)) as Image;
  }
}
