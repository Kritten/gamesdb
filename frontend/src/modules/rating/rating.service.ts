import { queryPageRatings } from '@/modules/rating/graphql/rating.graphql';
import { Rating } from '@/modules/rating/rating.model';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import {
    ServiceCollectionInterface,
    InputCollection,
    ServiceCollectionLoadPage,
} from '../app/utilities/collection/collection.types';

class ServiceRatingClass implements ServiceCollectionInterface<Rating> {
    async loadPage(data: InputCollection) {
        return loadPageBase<
            Rating,
            { ratings: ServiceCollectionLoadPage<Rating> }
        >({
            data,
            query: queryPageRatings,
            parseResult: async (response) => ({
                items: await Promise.all(
                    response.ratings.items.map((rating: Rating) =>
                        Rating.parseFromServer(rating)
                    )
                ),
                count: response.ratings.count,
            }),
        });
    }
}

export const ServiceRating = new ServiceRatingClass();
