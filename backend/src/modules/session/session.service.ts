import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Session} from "./session.entity";

@Injectable()
export class SessionService {
  constructor() {}

  async findAll(): Promise<Session[]> {
    return await getManager().find(Session);
  }

  async create(data: Session | Session[]) {
    const sessions = data instanceof Session ? [data] : data;

    const result = await getManager().save(Session, sessions);

    return result instanceof Session ? result : result[0];
  }

  async update(data: Session | Session[]) {
    const sessions = data instanceof Session ? [data] : data;

    const result = await getManager().save(Session, sessions);

    return result instanceof Session ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Session, id);

    return result.affected > 0;
  }
}
