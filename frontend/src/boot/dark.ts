import { boot } from 'quasar/wrappers';
import { Dark } from 'quasar';

export default boot(() => {
    const isDarkMode = localStorage.getItem('darkMode');

    Dark.set(isDarkMode === 'true');
});
