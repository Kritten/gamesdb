import { createApp } from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import { store } from '@/modules/app/app.store';
import { router } from '@/modules/app/app.router';
import { i18n } from '@/modules/app/app.i18n';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/de.js';

createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(ElementPlus, { locale })
  .mount('#app');
