import {Entity, getManager} from "typeorm/index";
import {Injectable, Optional} from "@nestjs/common";

interface InterfaceEntity {
    id: number;
}

@Injectable()
export class EntityService<T extends InterfaceEntity> {
    private readonly entityClass: { new(): T };
    protected relations: string[] = [];

    constructor(@Optional() cls?: { new(): T }) {
        console.log(cls, "cls");
        this.entityClass = cls;
    }

    async findOne(id: number): Promise<T> {
        return await getManager().findOne(this.entityClass, id, {
            relations: this.relations
        });
    }

    async find(data: any = {}): Promise<T[]> {
        return await getManager().find(this.entityClass, {
            ...{
                relations: this.relations,
            },
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
            {
                relations: this.relations,
            },
        );

        return Array.isArray(data) ? itemsNew : itemsNew[0];
    }

    async delete(id: number | number[]): Promise<boolean> {
        const result = await getManager().delete(this.entityClass, id);

        return result.affected > 0;
    }
}