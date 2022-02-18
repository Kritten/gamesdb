import { ref } from 'vue';

const isInitialized = ref(false);

export const useApp = () => ({
    isInitialized,
    setIsInitialized(value: boolean) {
        isInitialized.value = value;
    },
});
