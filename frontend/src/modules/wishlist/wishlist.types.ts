import { EntityInterface } from '@/modules/app/utilities/entity/entity.types';

export interface WishlistInterface extends EntityInterface {
  name?: string;
  price?: number;
  description?: string;
  link?: string;
  images?: Array<string>;
  taken?: boolean;
  giftFor?: number;
}
