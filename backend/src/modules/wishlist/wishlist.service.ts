import {Wishlist} from "./wishlist.entity";
import {EntityService} from "../../utilities/EntityService";

export class WishlistService extends EntityService<Wishlist> {
  constructor() {
    super();
    this.entityClass = Wishlist;
  }
}
