// import { Injectable, NotFoundException, Optional } from '@nestjs/common';
// import { merge } from 'lodash';
// import { BaseEntity } from '../types';
// import { cloneDeep } from 'lodash';
// import {InputCollection} from "../collection/collection.input";
//
// interface PrismaDelegate {
//   findUnique: {
//
//   }
// }
//
// @Injectable()
// export class EntityService<T extends BaseEntity> {
//   private readonly entityClass: ObjectType<T>;
//   private readonly _optionsDefaultPassed: FindManyOptions<T>;
//   public readonly annotations: Array<(query, data: InputCollection) => void>;
//
//   constructor(
//     @Optional() prismaDelegate: PrismaDelegate<T>,
//     @Optional() cls: ObjectType<T>,
//     @Optional() options: FindManyOptions<T> = {},
//     @Optional() annotations: Array<(query, data: InputCollection) => void> = [],
//   ) {
//     this.prismaDelegate = prismaDelegate;
//     this.entityClass = cls;
//     this._optionsDefaultPassed = options;
//     this.annotations = annotations;
//   }
//
//   public get optionsDefault() {
//     return cloneDeep(this._optionsDefaultPassed);
//   }
//
//   async findOne(id: number): Promise<T> {
//     await this.prismaDelegate.()
//     const result = await getManager().findOne(
//       this.entityClass,
//       id,
//       merge(this.optionsDefault, options),
//     );
//
//     if (result === undefined) {
//       throw new NotFoundException(`Entity with id ${id} not found`);
//     }
//
//     return result;
//   }
//
//   async find(options: FindManyOptions<T> = {}): Promise<T[]> {
//     return await getManager().find(
//       this.entityClass,
//       merge(this.optionsDefault, options),
//     );
//   }
//
//   async findAndCount(options: FindManyOptions<T> = {}): Promise<[T[], number]> {
//     return await getManager().findAndCount(
//       this.entityClass,
//       merge(this.optionsDefault, options),
//     );
//   }
//
//   async create(data: T | T[]): Promise<T | T[]> {
//     const items = Array.isArray(data) ? data : [data];
//
//     const result = await getManager().save(
//       (this.entityClass as unknown) as typeof Entity,
//       items,
//     );
//
//     return Array.isArray(data) ? result : result[0];
//   }
//
//   async update(data: T | T[]): Promise<T | T[]> {
//     const items = Array.isArray(data) ? data : [data];
//
//     const result = await getManager().save(
//       (this.entityClass as unknown) as typeof Entity,
//       items,
//     );
//
//     const itemsNew: T[] = await getManager().findByIds(
//       this.entityClass,
//       result.map(entity => entity.id),
//       this.optionsDefault,
//     );
//
//     return Array.isArray(data) ? itemsNew : itemsNew[0];
//   }
//
//   async delete(id: number | number[]): Promise<boolean> {
//     const result = await getManager().delete(this.entityClass, id);
//
//     return result.affected > 0;
//   }
// }
