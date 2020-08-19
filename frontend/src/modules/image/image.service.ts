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

export class ServiceImage {
  static useCreate() {
    let image = ref(new Image());

    return {
      image,
      create: async () => {
        await ServiceImage.create(image.value);
        image.value = new Image();
      },
    };
  }

  static useUpdate(imagePassed: Image) {
    let image = ref(cloneDeep(imagePassed));

    return {
      image,
      update: async () => {
        image.value = cloneDeep(await ServiceImage.update(image.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (image: Image) => ServiceImage.delete(image),
    };
  }

  static async create(image: Image) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateImage,
      variables: {
        image,
      },
    });

    const imageNew = Image.parseFromServer(response.data.createImage);
    store.commit('moduleImage/addImage', imageNew);

    return imageNew;
  }

  static async update(image: Image) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateImage,
      variables: {
        image,
      },
    });

    const imageNew = Image.parseFromServer(response.data.updateImage);
    store.commit('moduleImage/addImage', imageNew);

    return imageNew;
  }

  static async delete(image: Image) {
    await apolloClient.mutate({
      mutation: mutationDeleteImage,
      variables: {
        id: image.id,
      },
    });

    store.commit('moduleImage/deleteImage', image);
  }
}
