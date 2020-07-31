import {Entity, getManager} from "typeorm/index";
import {Injectable, Optional} from "@nestjs/common";

interface InterfaceEntity {
    id: number;
}

@Injectable()
export class EntityService<T extends InterfaceEntity> {
    protected relations: string[] = [];

    private readonly entityClass: { new(): T };
    private readonly optionsDefault: {};

    constructor(@Optional() cls?: { new(): T }) {
        this.entityClass = cls;
        this.optionsDefault = {
            relations: this.relations
        };
    }

    async findOne(id: number): Promise<T> {
        return await getManager().findOne(this.entityClass, id, this.optionsDefault);
    }

    async find(data: any = {}): Promise<T[]> {
        return await getManager().find(this.entityClass, {
            ...this.optionsDefault,
            ...data
        });
    }

    async create(data: T | T[]): Promise<T | T[]> {
        const items = Array.isArray(data) ? data : [data];

        const result = await getManager().save(this.entityClass as unknown as typeof Entity, items);

        return Array.isArray(data) ? result : result[0];
    }

    async update(data: T | T[]): Promise<T | T[]> {
        const items = Array.isArray(data) ? data : [data];

        const result = await getManager().save(this.entityClass as unknown as typeof Entity, items);

        const itemsNew: T[] = await getManager().findByIds(
            this.entityClass,
            result.map(entity => entity.id),
            this.optionsDefault,
        );

        return Array.isArray(data) ? itemsNew : itemsNew[0];
    }

    async delete(id: number | number[]): Promise<boolean> {
        const result = await getManager().delete(this.entityClass, id);

        return result.affected > 0;
    }
}