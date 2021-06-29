import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { WishlistInterface } from '@/modules/wishlist/wishlist.types';
import { setDefaultIfNullOrUndefined } from '@/modules/app/utilities/helpers';
import { EntityInterface } from '../app/utilities/entity/entity.types';

export class Wishlist extends Entity implements WishlistInterface {
  name: string;

  price: number;

  description: string;

  link: string;

  images: Array<string>;

  taken: boolean;

  giftFor: number;

  constructor(data: WishlistInterface = {}) {
    super(data);
    this.name = setDefaultIfNullOrUndefined<string>(data.name, '');
    this.price = setDefaultIfNullOrUndefined<number>(data.price, 1000);
    this.description = setDefaultIfNullOrUndefined<string>(data.description, '');
    this.link = setDefaultIfNullOrUndefined<string>(data.link, '');
    this.images = setDefaultIfNullOrUndefined<Array<string>>(data.images, []);
    this.taken = setDefaultIfNullOrUndefined<boolean>(data.taken, false);
    this.giftFor = setDefaultIfNullOrUndefined<number>(data.giftFor, 0);
  }

  static async parseFromServer(data: EntityInterface): Promise<Wishlist> {
    const entity = (await super.parseFromServer(data)) as Wishlist;

    // TODO: handle images

    return entity;
  }

  prepareForServer() {
    const data = super.prepareForServer();

    data.name = this.name;
    data.price = this.price;
    data.description = this.description;
    data.link = this.link;
    data.images = JSON.stringify(this.images);
    data.taken = this.taken;
    data.giftFor = this.giftFor;

    return data;
  }
}
