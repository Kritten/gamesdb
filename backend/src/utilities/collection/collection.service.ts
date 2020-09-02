import { Injectable, Optional } from '@nestjs/common';
import { BaseEntity } from '../types';
import { InputCollection } from './collection.input';
import { EntityService } from '../entity/entity.service';
import { getConnection, ObjectType } from 'typeorm';

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

  private getRelations() {
    return this.service.optionsDefault.relations === undefined
      ? []
      : this.service.optionsDefault.relations;
  }

  async loadPage(data: InputCollection) {
    console.group(this.service);
    console.warn(data, 'data');
    // console.log(this.entityClass, 'this.entityClass');

    const query = await getConnection().createQueryBuilder(
      this.entityClass as ObjectType<T>,
      'entity',
    );

    if (data.filters !== undefined) {
      for (const filter of data.filters.filter(
        filter => filter.value !== undefined,
      )) {
        const valueFormatted =
          filter.operator !== 'like' ? filter.value : `%${filter.value}%`;

        query.where(`entity.${filter.field} ${filter.operator} :value`, {
          value: valueFormatted,
        });
      }
    }

    for (const relation of this.getRelations()) {
      query.leftJoinAndSelect(`entity.${relation}`, relation);
    }

    query.orderBy(`entity.${data.sortBy}`, data.sortDesc ? 'DESC' : 'ASC');

    query.take(data.count);
    query.skip((data.page - 1) * data.count);
    // TODO: create new requests for relations
    // query.limit(data.count);
    // query.offset((data.page - 1) * data.count);

    console.warn(query.getSql());

    const [items, count] = await query.getManyAndCount();

    // console.warn(data.sortBy, 'data.sortBy');
    console.groupEnd();
    return {
      items,
      count,
    };

    // await sleep(3000);
    const where = [];
    // if (data.filters !== undefined) {
    //   for (const filter of data.filters.filter(
    //     filter => filter.value !== undefined,
    //   )) {
    //     switch (filter.operator) {
    //       case 'Equal':
    //         where.push({
    //           [filter.field]: Equal(filter.value),
    //         });
    //         break;
    //       case 'Like':
    //         where.push({
    //           [filter.field]: Like(`%${filter.value}%`),
    //         });
    //         break;
    //       default:
    //         throw Error(`Unsupported Operator '${filter.operator}'`);
    //     }
    //   }
    // }
    if (data.sortBy === 'playtime') {
      const [items, count] = await this.service.findAndCount({
        take: data.count,
        skip: (data.page - 1) * data.count,
        // order: {
        //   [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
        // },
        where,
      });

      return {
        items,
        count,
      };
      // const [items, count] = await getConnection()
      //   .createQueryBuilder(this.entityClass as ObjectType<T>, 'entity')
      //   .getManyAndCount();
      //
      // console.log(
      //   await getConnection()
      //     .createQueryBuilder(this.entityClass as ObjectType<T>, 'entity')
      //     .getSql(),
      // );
      //
      // console.warn(items, 'items');
      //
      // return {
      //   items,
      //   count,
      // };
    } else {
      const [items, count] = await this.service.findAndCount({
        take: data.count,
        skip: (data.page - 1) * data.count,
        // order: {
        //   [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
        // },
        where,
      });

      console.log(items[0], 'items[0]');

      return {
        items,
        count,
      };
    }
  }
}
