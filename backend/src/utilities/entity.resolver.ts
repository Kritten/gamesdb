import {BaseEntity, BaseInputData, BaseService} from "./types";
import {In} from "typeorm/index";

export class EntityResolver {
    async handleRelation(name: string, entity: BaseEntity, entityData: BaseInputData, service: BaseService) {
        if (entityData[name] !== undefined) {
            entity[name] = entityData[name].length === 0 ? [] : await service.find({id: In(entityData[name])});
        }
    }
}