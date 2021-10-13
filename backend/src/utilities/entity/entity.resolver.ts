// import { BaseEntity, BaseInputData } from '../types';
// import { NotFoundException } from '@nestjs/common';
// import { EntityService } from './entity.service';
//
// export class EntityResolver {
//   async handleRelation(
//     name: string,
//     entity: BaseEntity,
//     entityData: BaseInputData,
//     service: EntityService<BaseEntity>,
//   ) {
//     if (entityData[name] !== undefined) {
//       if (Array.isArray(entityData[name])) {
//         // entity[name] =
//         //   entityData[name].length === 0
//         //     ? []
//         //     : await service.find({ where: { id: In(entityData[name]) } });
//
//         if (entity[name].length !== entityData[name].length) {
//           const setIds = new Set(entity[name].map(item => item.id));
//           const entitiesMissing = entityData[name].filter(
//             id => setIds.has(id) === false,
//           );
//           throw new NotFoundException(
//             `${name} with ids ${entitiesMissing} not found`,
//           );
//         }
//       } else {
//         entity[name] =
//           entityData[name] === null
//             ? null
//             : await service.findOne(entityData[name]);
//       }
//     }
//   }
// }
