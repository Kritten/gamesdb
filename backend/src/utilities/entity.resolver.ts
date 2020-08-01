import { BaseEntity, BaseInputData, BaseService } from './types';
import { In } from 'typeorm/index';
import { NotFoundException } from '@nestjs/common';

export class EntityResolver {
  async handleRelation(
    name: string,
    entity: BaseEntity,
    entityData: BaseInputData,
    service: BaseService,
  ) {
    if (entityData[name] !== undefined) {
      entity[name] =
        entityData[name].length === 0
          ? []
          : await service.find({ where: { id: In(entityData[name]) } });

      if (entity[name].length !== entityData[name].length) {
        const setIds = new Set(entity[name].map(item => item.id));
        const entitiesMissing = entityData[name].filter(
          id => setIds.has(id) === false,
        );
        throw new NotFoundException(
          `${name} with ids ${entitiesMissing} not found`,
        );
      }
    }
  }
}
