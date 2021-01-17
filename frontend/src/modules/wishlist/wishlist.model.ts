import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { WishlistInterface } from '@/modules/wishlist/wishlist.types';
import { Image } from '@/modules/image/image.model';
import { EntityInterface } from '../app/utilities/entity/entity.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';

export class Wishlist extends Entity implements WishlistInterface {
  name: string;

  price: number;

  link: string;

  images: Image[];

  taken: boolean;

  giftFor: number;

  constructor(data: WishlistInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    this.price = setDefaultIfNullOrUndefined<number>(data.price, 0);
    this.link = setDefaultIfNullOrUndefined<string>(data.link, '');
    this.images = setDefaultIfNullOrUndefined<Image[]>(data.images, []);
    this.taken = setDefaultIfNullOrUndefined<boolean>(data.taken, false);
    this.giftFor = setDefaultIfNullOrUndefined<number>(data.giftFor, 0);
  }

  static async parseFromServer(data: EntityInterface): Promise<Wishlist> {
    const entity = (await super.parseFromServer(data)) as Wishlist;

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.name = this.name;
    data.price = this.price;
    data.link = this.link;
    data.images = this.images.map(image => image.id);
    data.taken = this.taken;
    data.giftFor = this.giftFor;

    return data;
  }
}
