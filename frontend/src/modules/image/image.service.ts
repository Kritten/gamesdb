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
import {
  ServiceCollectionInterface,
  InputCollection,
} from '@/modules/app/utilities/collection/collection.types';
import { queue } from '@/queue';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';

class ServiceImageClass
implements ServiceEntityInterface<Image>, ServiceCollectionInterface<Image> {
  useCreate() {
    const image = ref(new Image());

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
    const image = ref(cloneDeep(imagePassed));

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

  async loadPage(data: InputCollection) {
    return loadPageBase<Image>({
      data,
      query: queryPageImage,
      parseResult: async (response) => ({
        items: await Promise.all(
          response.data.images.items.map((image: Image) => Image.parseFromServer(image)),
        ),
        count: response.data.images.count,
      }),
    });
  }
}

export const ServiceImage = new ServiceImageClass();
