import {
  ServiceCollectionInterface,
  InputCollection,
} from '@/modules/app/utilities/collection/collection.types';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { queryPagePlaytime } from '@/modules/playtime/graphql/playtime.graphql';
import { Playtime } from './playtime.model';

class ServicePlaytimeClass implements ServiceCollectionInterface<Playtime> {
  async loadPage(data: InputCollection) {
    return loadPageBase<Playtime>({
      data,
      query: queryPagePlaytime,
      parseResult: async (response) => ({
        items: await Promise.all(
          response.data.playtimes.items.map((playtime: Playtime) => Playtime.parseFromServer(playtime)),
        ),
        count: response.data.playtimes.count,
      }),
    });
  }
}

export const ServicePlaytime = new ServicePlaytimeClass();
