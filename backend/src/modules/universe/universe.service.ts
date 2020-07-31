import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Universe} from "./universe.entity";

@Injectable()
export class UniverseService {
  constructor() {}

  async findAll(): Promise<Universe[]> {
    return await getManager().find(Universe);
  }

  async create(data: Universe | Universe[]) {
    const universes = data instanceof Universe ? [data] : data;

    const result = await getManager().save(Universe, universes);

    return result instanceof Universe ? result : result[0];
  }

  async update(data: Universe | Universe[]) {
    const universes = data instanceof Universe ? [data] : data;

    const result = await getManager().save(Universe, universes);

    return result instanceof Universe ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Universe, id);

    return result.affected > 0;
  }
}
