import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Game} from "./game.entity";

@Injectable()
export class GameService {
  constructor() {}

  async findAll(): Promise<Game[]> {
    return await getManager().find(Game);
  }

  async create(data: Game | Game[]) {
    const games = data instanceof Game ? [data] : data;

    return await getManager().insert(Game, games);
  }
}
