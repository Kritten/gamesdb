import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateImage,
  mutationDeleteImage,
  mutationUpdateImage,
  queryPageImage,
} from '@/modules/image/graphql/image.graphql';
import { Image } from '@/modules/image/image.model';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { ServiceCollectionInterface } from '@/modules/app/utilities/collection/collection.types';
import { queue } from '@/queue';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';

class ServiceImageClass
  implements ServiceEntityInterface<Image>, ServiceCollectionInterface<Image> {
  useCreate() {
    let image = ref(new Image());

    return {
      entity: image,
      create: async () => {
        const imageNew = await this.create(image.value);
        image.value = new Image();
        return imageNew;
      },
    };
  }

  useUpdate(imagePassed: Image) {
    let image = ref(cloneDeep(imagePassed));

    return {
      entity: image,
      update: async () => {
        image.value = cloneDeep(await this.update(image.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (image: Image) => this.delete(image),
    };
  }

  async create(image: Image) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateImage,
      variables: {
        image,
      },
    });

    const imageNew = await Image.parseFromServer(response.data.createImage);

    queue.notify('createdImage', imageNew);

    return imageNew;
  }

  async update(image: Image) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateImage,
      variables: {
        image,
      },
    });

    const imageNew = await Image.parseFromServer(response.data.updateImage);

    queue.notify('updatedImage', imageNew);

    return imageNew;
  }

  async delete(image: Image) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteImage,
      variables: {
        id: image.id,
      },
    });

    queue.notify('deletedImage', image);

    return response.data.deleteImage;
  }

  async loadPage({ page, count, sortBy, sortDesc, filters }: InputCollection) {
    const response = await apolloClient.query({
      query: queryPageImage,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        filters,
      },
    });

    const entities: Image[] = await Promise.all(
      response.data.images.items.map((image: Image) => Image.parseFromServer(image)),
    );

    return {
      count: response.data.images.count,
      items: entities,
    };
  }
}

export const ServiceImage = new ServiceImageClass();
