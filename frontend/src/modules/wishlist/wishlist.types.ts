import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { Image } from '@/modules/image/image.model';

export interface WishlistInterface extends EntityInterface {
  name?: string;
  price?: number;
  link?: string;
  images?: Image[];
  taken?: boolean;
}
