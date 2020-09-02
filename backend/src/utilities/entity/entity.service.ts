import { Entity, getManager } from 'typeorm';
import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { merge } from 'lodash';
import { BaseEntity } from '../types';
import { cloneDeep } from 'lodash';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ObjectType } from 'typeorm/common/ObjectType';

@Injectable()
export class EntityService<T extends BaseEntity> {
  private readonly entityClass: ObjectType<T>;
  private readonly _optionsDefaultPassed: FindManyOptions<T>;

  constructor(
    @Optional() cls: ObjectType<T>,
    @Optional() options?: FindManyOptions<T>,
  ) {
    this.entityClass = cls;
    this._optionsDefaultPassed = options;
  }

  public get optionsDefault() {
    return cloneDeep(this._optionsDefaultPassed);
  }

  async findOne(id: number, options: FindManyOptions<T> = {}): Promise<T> {
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

  async find(options: FindManyOptions<T> = {}): Promise<T[]> {
    return await getManager().find(
      this.entityClass,
      merge(this.optionsDefault, options),
    );
  }

  async findAndCount(options: FindManyOptions<T> = {}): Promise<[T[], number]> {
    return await getManager().findAndCount(
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
