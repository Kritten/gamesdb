import {Game} from "./game.entity";
import {EntityService} from "../../utilities/EntityService";

export class GameService extends EntityService<Game> {
  constructor() {
    super(Game, {relations: ['categories']});
  }
}
