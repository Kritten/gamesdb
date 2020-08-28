import { Injectable, Optional } from '@nestjs/common';
import { BaseEntity } from '../types';
import { InputCollection } from './collection.input';
import { EntityService } from '../entity/entity.service';
import { Equal, Like } from 'typeorm/index';

@Injectable()
export class CollectionService<T extends BaseEntity> {
  private readonly entityClass: { new (): T };
  private readonly service: EntityService<BaseEntity>;

  constructor(
    @Optional() cls: { new (): T },
    @Optional() service: EntityService<BaseEntity>,
  ) {
    this.entityClass = cls;
    this.service = service;
  }
  async loadPage(data: InputCollection) {
    // await sleep(3000);
    const where = [];
    if (data.filters !== undefined) {
      for (const filter of data.filters.filter(
        filter => filter.value !== null,
      )) {
        switch (filter.operator) {
          case 'Equal':
            where.push({
              [filter.field]: Equal(filter.value),
            });
            break;
          case 'Like':
            where.push({
              [filter.field]: Like(`%${filter.value}%`),
            });
            break;
          default:
            throw Error(`Unsupported Operator '${filter.operator}'`);
        }
      }
    }
    console.warn(where, 'where');
    const [items, count] = await this.service.findAndCount({
      take: data.count,
      skip: (data.page - 1) * data.count,
      order: {
        [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
      },
      where,
    });

    return {
      items,
      count,
    };
  }
}
