import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Player} from "./player.entity";

@Injectable()
export class PlayerService {
  constructor() {}

  async findAll(): Promise<Player[]> {
    return await getManager().find(Player);
  }

  async create(data: Player | Player[]) {
    const players = data instanceof Player ? [data] : data;

    const result = await getManager().save(Player, players);

    return result instanceof Player ? result : result[0];
  }

  async update(data: Player | Player[]) {
    const players = data instanceof Player ? [data] : data;

    const result = await getManager().save(Player, players);

    return result instanceof Player ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Player, id);

    return result.affected > 0;
  }
}
