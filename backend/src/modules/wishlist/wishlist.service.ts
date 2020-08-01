import {Wishlist} from "./wishlist.entity";
import {EntityService} from "../../utilities/entity.service";

export class WishlistService extends EntityService<Wishlist> {
  constructor() {
    super(Wishlist);
  }
}
