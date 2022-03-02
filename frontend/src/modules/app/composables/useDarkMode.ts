import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';

export const useDarkMode = () => {
    const { dark } = useQuasar();

    const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

    watch(
        isDarkMode,
        (isDarkModeNew) => {
            localStorage.setItem('darkMode', isDarkModeNew.toString());
            dark.set(isDarkModeNew);
        },
        { immediate: true }
    );

    return {
        isDarkMode,
    };
};
