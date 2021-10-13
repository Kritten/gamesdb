import { Injectable, Optional } from '@nestjs/common';
import { BaseEntity } from '../types';
import { InputCollection } from './collection.input';
import { annotationsStatistics } from '../../modules/statistics/statistics.annotations';

const regexComputedField = new RegExp(
  /^(?<sortBy>[a-zA-Z.]+):(?<name>[a-zA-Z]+)$/,
);

// @Injectable()
// export class CollectionService<T extends BaseEntity> {
//   private readonly entityClass: { new (): T };
//   private readonly service: EntityService<BaseEntity>;
//
//   constructor(
//     @Optional() cls: { new (): T },
//     @Optional() service: EntityService<BaseEntity>,
//   ) {
//     this.entityClass = cls;
//     this.service = service;
//   }
//
//   private getRelations() {
//     return this.service.optionsDefault.relations === undefined
//       ? []
//       : this.service.optionsDefault.relations;
//   }
//
//   private getAnnotations() {
//     return this.service.annotations;
//   }
//
//   where(query, data: InputCollection) {
//     let indexParams = 0;
//     for (let i = 0; i < data.filters.length; i++) {
//       const filter = data.filters[i];
//
//       let value;
//       if (filter.valueBoolean !== undefined) {
//         value = filter.valueBoolean;
//       } else if (filter.valueFloat !== undefined) {
//         value = filter.valueFloat;
//       } else if (filter.valueInt !== undefined) {
//         value = filter.valueInt;
//       } else if (filter.valueString !== undefined) {
//         value = filter.valueString;
//       } else if (filter.valueDate !== undefined) {
//         value = filter.valueDate;
//       } else if (filter.valueRange !== undefined) {
//         value = filter.valueRange;
//       }
//
//       if (value === undefined || value === -1) {
//         continue;
//       }
//
//       const valueFormatted = filter.operator !== 'like' ? value : `%${value}%`;
//
//       let nameFunctionWhere = 'where';
//       if (i > 0) {
//         nameFunctionWhere = 'andWhere';
//       }
//
//       let operation = `${filter.operator} :${indexParams}`;
//       let params = {
//         [indexParams]: valueFormatted,
//       };
//
//       if (Array.isArray(value)) {
//         if (value[1] === 100) {
//           operation = `>= :${indexParams}`;
//           params = {
//             [indexParams]: value[0],
//           };
//           indexParams += 1;
//         } else {
//           operation = `${filter.operator} :${indexParams} and :${indexParams +
//             1}`;
//           params = {
//             [indexParams]: value[0],
//             [indexParams + 1]: value[1],
//           };
//           indexParams += 2;
//         }
//       } else {
//         indexParams += 1;
//       }
//
//       if (filter.field.includes('.')) {
//         query[nameFunctionWhere](`${filter.field} ${operation}`, params);
//       } else {
//         query[nameFunctionWhere](`entity.${filter.field} ${operation}`, params);
//       }
//     }
//   }
//
//   private annotate(query, data: InputCollection) {
//     for (const annotation of this.getAnnotations()) {
//       annotation(query, data);
//     }
//   }
//
//   private join(query, data: InputCollection) {
//     for (const relation of this.getRelations()) {
//       query.leftJoinAndSelect(`entity.${relation}`, relation);
//     }
//     for (const join of data.leftJoins) {
//       const [table, comparison] = join.split('|');
//       query.leftJoin(table, table, comparison);
//     }
//   }
//
//   orderBy(query, data: InputCollection) {
//     for (let i = 0; i < data.sortBy.length; i++) {
//       let sortBy = data.sortBy[i];
//       const sortDesc = data.sortDesc[i];
//
//       const match = sortBy.match(regexComputedField);
//
//       if (match !== null) {
//         sortBy = match.groups.sortBy;
//         annotationsStatistics[match.groups.name](query);
//       }
//
//       let nameFunctionOrderBy = 'orderBy';
//       if (i > 0) {
//         nameFunctionOrderBy = 'addOrderBy';
//       }
//
//       if (sortBy.includes('.') && !sortBy.startsWith('entity.')) {
//         if (sortBy.startsWith('aggregation:')) {
//           const [table, aggregation] = sortBy.slice(12).split('.');
//           query.addSelect(
//             subQuery =>
//               subQuery
//                 .select(aggregation, 'foo')
//                 .from(table, table)
//                 .where(`${table}.sessionId = entity.id`),
//             'kritten',
//           );
//           query[nameFunctionOrderBy]('kritten', sortDesc ? 'DESC' : 'ASC');
//         } else if (sortBy.startsWith('relation:')) {
//           const [entity, field] = sortBy.slice(9).split('.');
//           query[nameFunctionOrderBy](
//             `${entity}.${field}`,
//             sortDesc ? 'DESC' : 'ASC',
//           );
//         }
//       } else {
//         query[nameFunctionOrderBy](`${sortBy}`, sortDesc ? 'DESC' : 'ASC');
//       }
//     }
//   }
//
//   paginate(
//     query,
//     data: InputCollection,
//     useTakeAndSkip = true,
//   ) {
//     if (data.count !== null) {
//       if (useTakeAndSkip) {
//         query.take(data.count);
//         query.skip((data.page - 1) * data.count);
//       } else {
//         // TODO: create new requests for relations
//         query.limit(data.count);
//         query.offset((data.page - 1) * data.count);
//       }
//     }
//   }
//
//   async loadPage(data: InputCollection) {
//     // const query = await getConnection().createQueryBuilder(
//     //   this.entityClass as ObjectType<T>,
//     //   'entity',
//     // );
//     //
//     // this.where(query, data);
//     //
//     // this.join(query, data);
//     //
//     // this.annotate(query, data);
//     //
//     // this.orderBy(query, data);
//     //
//     // this.paginate(query, data);
//     //
//     // // console.warn(query.getSql());
//     //
//     // const [items, count] = await query.getManyAndCount();
//     // const resultRaw = await query.getRawMany();
//     // console.warn(resultRaw.length, "resultRaw.length");
//     //
//     // // TODO: after ORM change handle playtimeLast correctly
//     // // if (this.service.annotations.length > 0) {
//     // //   // console.warn(resultRaw, "resultRaw");
//     // //
//     // //   for (let i = 0; i < items.length; i += 1) {
//     // //     console.log(items[i].id, resultRaw[i].entity_id, "items.[i].entity_id");
//     // //     // console.log(resultRaw[i].playtimeLast, "resultRaw[i].playtimeLast");
//     // //     // @ts-ignore
//     // //     items[i].playtimeLast = resultRaw[i].playtimeLast;
//     // //   }
//     // //   // console.warn(resultRaw.map(item => item.playtimeLast), "items[0]");
//     // //   console.log(items.map(item => ({ id: item.id, playtimeLast: item.playtimeLast })), "items.map(item => item.id)");
//     // // }
//     // return {
//     //   items,
//     //   count,
//     // };
//
//     //   // await sleep(3000);
//     //   const where = [];
//     //   // if (data.filters !== undefined) {
//     //   //   for (const filter of data.filters.filter(
//     //   //     filter => filter.value !== undefined,
//     //   //   )) {
//     //   //     switch (filter.operator) {
//     //   //       case 'Equal':
//     //   //         where.push({
//     //   //           [filter.field]: Equal(filter.value),
//     //   //         });
//     //   //         break;
//     //   //       case 'Like':
//     //   //         where.push({
//     //   //           [filter.field]: Like(`%${filter.value}%`),
//     //   //         });
//     //   //         break;
//     //   //       default:
//     //   //         throw Error(`Unsupported Operator '${filter.operator}'`);
//     //   //     }
//     //   //   }
//     //   // }
//     //   if (data.sortBy === 'playtime') {
//     //     const [items, count] = await this.service.findAndCount({
//     //       take: data.count,
//     //       skip: (data.page - 1) * data.count,
//     //       // order: {
//     //       //   [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
//     //       // },
//     //       where,
//     //     });
//     //
//     //     return {
//     //       items,
//     //       count,
//     //     };
//     //     // const [items, count] = await getConnection()
//     //     //   .createQueryBuilder(this.entityClass as ObjectType<T>, 'entity')
//     //     //   .getManyAndCount();
//     //     //
//     //     // console.log(
//     //     //   await getConnection()
//     //     //     .createQueryBuilder(this.entityClass as ObjectType<T>, 'entity')
//     //     //     .getSql(),
//     //     // );
//     //     //
//     //     // console.warn(items, 'items');
//     //     //
//     //     // return {
//     //     //   items,
//     //     //   count,
//     //     // };
//     //   } else {
//     //     const [items, count] = await this.service.findAndCount({
//     //       take: data.count,
//     //       skip: (data.page - 1) * data.count,
//     //       // order: {
//     //       //   [data.sortBy]: data.sortDesc ? 'DESC' : 'ASC',
//     //       // },
//     //       where,
//     //     });
//     //
//     //     console.log(items[0], 'items[0]');
//     //
//     //     return {
//     //       items,
//     //       count,
//     //     };
//     //   }
//   }
// }
