import { getManager } from 'typeorm';
import {Game} from "./game.entity";
import {EntityService} from "../../utilities/EntityService";

export class GameService extends EntityService<Game> {
  constructor() {
    super();
    this.entityClass = Game
  }

  async findAll(): Promise<Game[]> {
    return await getManager().find(Game, {
      relations: ['categories'],
    });
  }
}
