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

    const result = await getManager().save(Game, games);

    return result instanceof Game ? result : result[0];
  }

  async update(data: Game | Game[]) {
    const games = data instanceof Game ? [data] : data;

    const result = await getManager().save(Game, games);

    return result instanceof Game ? result : result[0];
  }

  async delete(idGame: number | number[]) {
    const result = await getManager().delete(Game, idGame);

    return result.affected > 0;
  }
}
