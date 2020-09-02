import { Injectable, Optional } from '@nestjs/common';
import { BaseEntity } from '../types';
import { InputCollection } from './collection.input';
import { EntityService } from '../entity/entity.service';
import { getConnection, ObjectType, SelectQueryBuilder } from 'typeorm';

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

  private where(query: SelectQueryBuilder<T>, data: InputCollection) {
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
  }

  private join(query: SelectQueryBuilder<T>, data: InputCollection) {
    for (const relation of this.getRelations()) {
      query.leftJoinAndSelect(`entity.${relation}`, relation);
    }
  }

  private orderBy(query: SelectQueryBuilder<T>, data: InputCollection) {
    if (data.sortBy.includes('.')) {
      const [table, aggregation] = data.sortBy.split('.');
      console.warn(aggregation, 'aggregation');
      query.addSelect(
        subQuery =>
          subQuery
            .select(aggregation, 'foo')
            .from(table, table)
            .where(`${table}.sessionId = entity.id`),
        'kritten',
      );
      query.orderBy('kritten', data.sortDesc ? 'DESC' : 'ASC');
    } else {
      query.orderBy(`entity.${data.sortBy}`, data.sortDesc ? 'DESC' : 'ASC');
    }
  }

  private paginate(query: SelectQueryBuilder<T>, data: InputCollection) {
    query.take(data.count);
    query.skip((data.page - 1) * data.count);
    // TODO: create new requests for relations
    // query.limit(data.count);
    // query.offset((data.page - 1) * data.count);
  }

  async loadPage(data: InputCollection) {
    console.group(this.service);
    console.warn(data, 'data');
    // console.log(this.entityClass, 'this.entityClass');

    const query = await getConnection().createQueryBuilder(
      this.entityClass as ObjectType<T>,
      'entity',
    );

    this.where(query, data);

    this.join(query, data);

    this.orderBy(query, data);

    this.paginate(query, data);

    // console.warn(query.getSql());

    const [items, count] = await query.getManyAndCount();

    console.warn(items, 'items');
    console.groupEnd();
    return {
      items,
      count,
    };

    //   // await sleep(3000);
    //   const where = [];
    //   // if (data.filters !== undefined) {
    //   //   for (const filter of data.filters.filter(
    //   //     filter => filter.value !== undefined,
    //   //   )) {
    //   //     switch (filter.operator) {
    //   //       case 'Equal':
    //   //         where.push({
    //   //           [filter.field]: Equal(filter.value),
    //   //         });
    //   //         break;
    //   //       case 'Like':
    //   //         where.push({
    //   //           [filter.field]: Like(`%${filter.value}%`),
    //   //         });
    //   //         break;
    //   //       default:
    //   //         throw Error(`Unsupported Operator '${filter.operator}'`);
    //   //     }
    //   //   }
    //   // }
    //   if (data.sortBy === 'playtime') {
    //     const [items, count] = await this.service.findAndCount({
    //       take: data.count,
    //       skip: (data.page - 1) * data.count,
    //       // order: {
    //       //   [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
    //       // },
    //       where,
    //     });
    //
    //     return {
    //       items,
    //       count,
    //     };
    //     // const [items, count] = await getConnection()
    //     //   .createQueryBuilder(this.entityClass as ObjectType<T>, 'entity')
    //     //   .getManyAndCount();
    //     //
    //     // console.log(
    //     //   await getConnection()
    //     //     .createQueryBuilder(this.entityClass as ObjectType<T>, 'entity')
    //     //     .getSql(),
    //     // );
    //     //
    //     // console.warn(items, 'items');
    //     //
    //     // return {
    //     //   items,
    //     //   count,
    //     // };
    //   } else {
    //     const [items, count] = await this.service.findAndCount({
    //       take: data.count,
    //       skip: (data.page - 1) * data.count,
    //       // order: {
    //       //   [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
    //       // },
    //       where,
    //     });
    //
    //     console.log(items[0], 'items[0]');
    //
    //     return {
    //       items,
    //       count,
    //     };
    //   }
  }
}
