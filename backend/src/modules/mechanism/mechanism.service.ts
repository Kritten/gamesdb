import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Mechanism} from "./mechanism.entity";

@Injectable()
export class MechanismService {
  constructor() {}

  async findAll(): Promise<Mechanism[]> {
    return await getManager().find(Mechanism);
  }

  async create(data: Mechanism | Mechanism[]) {
    const mechanisms = data instanceof Mechanism ? [data] : data;

    const result = await getManager().save(Mechanism, mechanisms);

    return result instanceof Mechanism ? result : result[0];
  }

  async update(data: Mechanism | Mechanism[]) {
    const mechanisms = data instanceof Mechanism ? [data] : data;

    const result = await getManager().save(Mechanism, mechanisms);

    return result instanceof Mechanism ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Mechanism, id);

    return result.affected > 0;
  }
}
