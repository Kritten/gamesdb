export type ServiceCollectionLoadPageParameters = {
  page: number;
  count: number;
  sortBy: string;
  sortDesc: boolean;
  params: { [key: string]: any };
};

export type ServiceCollectionLoadPageReturn<T> = Promise<{ count: number; items: T[] }>;

export interface ServiceCollectionInterface<T> {
  loadPage(data: ServiceCollectionLoadPageParameters): ServiceCollectionLoadPageReturn<T>;
}
