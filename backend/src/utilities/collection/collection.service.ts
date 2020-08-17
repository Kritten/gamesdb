import { Injectable, Optional } from '@nestjs/common';
import { BaseEntity } from '../types';
import { InputCollection } from './collection.input';
import { EntityService } from '../entity/entity.service';

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

  loadPage(data: InputCollection) {
    return this.service.find({
      take: data.count,
      skip: (data.page - 1) * data.count,
      order: {
        [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
      },
    });
  }
}
