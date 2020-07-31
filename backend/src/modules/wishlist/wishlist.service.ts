import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Wishlist} from "./wishlist.entity";

@Injectable()
export class WishlistService {
  constructor() {}

  async findAll(): Promise<Wishlist[]> {
    return await getManager().find(Wishlist);
  }

  async create(data: Wishlist | Wishlist[]) {
    const wishlists = data instanceof Wishlist ? [data] : data;

    const result = await getManager().save(Wishlist, wishlists);

    return result instanceof Wishlist ? result : result[0];
  }

  async update(data: Wishlist | Wishlist[]) {
    const wishlists = data instanceof Wishlist ? [data] : data;

    const result = await getManager().save(Wishlist, wishlists);

    return result instanceof Wishlist ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Wishlist, id);

    return result.affected > 0;
  }
}
