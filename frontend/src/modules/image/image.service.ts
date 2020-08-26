import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateImage,
  mutationDeleteImage,
  mutationUpdateImage,
} from '@/modules/image/graphql/image.graphql';
import { Image } from '@/modules/image/image.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';

class ServiceImageClass implements ServiceEntityInterface<Image> {
  useCreate() {
    let image = ref(new Image());

    return {
      entity: image,
      create: async () => {
        const imageNew = await ServiceImage.create(image.value);
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
        image.value = cloneDeep(await ServiceImage.update(image.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (image: Image) => ServiceImage.delete(image),
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
    store.commit('moduleImage/addImage', imageNew);

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
    store.commit('moduleImage/addImage', imageNew);

    return imageNew;
  }

  async delete(image: Image) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteImage,
      variables: {
        id: image.id,
      },
    });

    store.commit('moduleImage/deleteImage', image);

    return response.data.deleteImage;
  }
}

export const ServiceImage = new ServiceImageClass();
