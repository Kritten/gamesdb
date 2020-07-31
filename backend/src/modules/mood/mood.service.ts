import {Injectable} from '@nestjs/common';
import { getManager } from 'typeorm';
import {Mood} from "./mood.entity";

@Injectable()
export class MoodService {
  constructor() {}

  async findAll(): Promise<Mood[]> {
    return await getManager().find(Mood);
  }

  async create(data: Mood | Mood[]) {
    const moods = data instanceof Mood ? [data] : data;

    const result = await getManager().save(Mood, moods);

    return result instanceof Mood ? result : result[0];
  }

  async update(data: Mood | Mood[]) {
    const moods = data instanceof Mood ? [data] : data;

    const result = await getManager().save(Mood, moods);

    return result instanceof Mood ? result : result[0];
  }

  async delete(id: number | number[]) {
    const result = await getManager().delete(Mood, id);

    return result.affected > 0;
  }
}
