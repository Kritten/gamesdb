import { Injectable, Optional } from '@nestjs/common';
import { BaseEntity } from '../types';
import { InputCollection } from './collection.input';
import { EntityService } from '../entity/entity.service';
import { FindOneOptions } from 'typeorm/index';

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
    const filters: FindOneOptions<BaseEntity> = {};
    if (data.filters !== undefined) {
      for (const filter of data.filters) {
        switch (filter.operator) {
          default:
            filters[filter.operator] = [{ [filter.field]: filter.value }];
            break;
        }
      }
    }

    const [items, count] = await this.service.findAndCount({
      take: data.count,
      skip: (data.page - 1) * data.count,
      order: {
        [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
      },
      ...filters,
    });

    return {
      items,
      count,
    };
  }
}
