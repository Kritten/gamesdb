import { Image } from '@/modules/image/image.model';

interface StateInterface {
  images: Image[] | null;
}

export const moduleImage = {
  namespaced: true,
  state: {
    images: null,
  },
  mutations: {
    setImages(state: StateInterface, images: Image[]) {
      state.images = images;
    },
    addImage(state: StateInterface, image: Image) {
      if (state.images !== null && image.id !== undefined) {
        state.images[image.id] = image;
      }
    },
    deleteImage(state: StateInterface, image: Image) {
      if (state.images !== null && image.id !== undefined) {
        delete state.images[image.id];
      }
    },
  },
};
