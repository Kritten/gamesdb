import { ID } from '@/modules/app/utilities/entity/entity.types';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { TypeBaseUseEntityParameters } from '@/modules/app/base/composables/baseEntity.types';

export const baseUseEntity = <T extends Entity>({
    entities,
}: TypeBaseUseEntityParameters<T>) => ({
    setEntities(entitiesPassed: Record<ID, T>) {
        entities.value = entitiesPassed;
    },
    setEntity(entityPassed: T) {
        entities.value[entityPassed.id as ID] = entityPassed;
    },
    deleteEntity(entityPassed: T) {
        delete entities.value[entityPassed.id as ID];
    },
});
