import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { Quasar } from 'quasar';

import messages from 'src/i18n';

const i18n = createI18n({
    locale: Quasar.lang.isoName || 'de',
    messages,
});

export default boot(({ app }) => {
    // Set i18n instance on app
    app.use(i18n);
});

export { i18n };
