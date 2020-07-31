import {Entity, getManager} from "typeorm/index";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EntityService<T> {
    protected entityClass: any;

    constructor() {}

    async findAll(): Promise<T[]> {
        return await getManager().find(this.entityClass);
    }

    async find(data: any): Promise<T[]> {
        return await getManager().find(this.entityClass, data);
    }

    async create(data: T | T[]): Promise<T> {
        const items = data instanceof this.entityClass ? [data] : data;

        const result = await getManager().save(this.entityClass, items);

        return result instanceof this.entityClass ? result : result[0];
    }

    async update(data: T | T[]): Promise<T> {
        const items = data instanceof this.entityClass ? [data] : data;

        const result = await getManager().save(this.entityClass, items);

        return result instanceof this.entityClass ? result : result[0];
    }

    async delete(id: number | number[]): Promise<boolean> {
        const result = await getManager().delete(this.entityClass, id);

        return result.affected > 0;
    }
}