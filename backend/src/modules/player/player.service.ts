import {Player} from "./player.entity";
import {EntityService} from "../../utilities/EntityService";

export class PlayerService extends EntityService<Player> {
  constructor() {
    super(Player);
  }
}
