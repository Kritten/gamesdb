import { Entity, getManager } from 'typeorm/index';
import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { merge } from 'lodash';
import { BaseEntity } from '../types';

@Injectable()
export class EntityService<T extends BaseEntity> {
  private readonly entityClass: { new (): T };
  private readonly optionsDefault: {};

  constructor(
    @Optional() cls: { new (): T },
    @Optional() options?: { relations: string[] },
  ) {
    this.entityClass = cls;
    this.optionsDefault = options;
  }

  async findOne(id: number, options: {} = {}): Promise<T> {
    const result = await getManager().findOne(
      this.entityClass,
      id,
      merge(this.optionsDefault, options),
    );

    if (result === undefined) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return result;
  }

  async find(options: {} = {}): Promise<T[]> {
    return await getManager().find(
      this.entityClass,
      merge(this.optionsDefault, options),
    );
  }

  async create(data: T | T[]): Promise<T | T[]> {
    const items = Array.isArray(data) ? data : [data];

    const result = await getManager().save(
      (this.entityClass as unknown) as typeof Entity,
      items,
    );

    return Array.isArray(data) ? result : result[0];
  }

  async update(data: T | T[]): Promise<T | T[]> {
    const items = Array.isArray(data) ? data : [data];

    const result = await getManager().save(
      (this.entityClass as unknown) as typeof Entity,
      items,
    );

    const itemsNew: T[] = await getManager().findByIds(
      this.entityClass,
      result.map(entity => entity.id),
      this.optionsDefault,
    );

    return Array.isArray(data) ? itemsNew : itemsNew[0];
  }

  async delete(id: number | number[]): Promise<boolean> {
    const result = await getManager().delete(this.entityClass, id);

    return result.affected > 0;
  }
}
