import { Entity } from '@/modules/app/utilities/entity/entity.model';

export type ServiceCollectionLoadPageParameters = {
  page: number;
  count: number;
  sortBy: string;
  sortDesc: boolean;
  params: { [key: string]: any };
};

export type ServiceCollectionLoadPageReturn = Promise<{ count: number; items: Entity[] }>;

export interface ServiceCollectionStatic {
  loadPage(data: ServiceCollectionLoadPageParameters): ServiceCollectionLoadPageReturn;
}
