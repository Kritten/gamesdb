import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { store } from "@/modules/app/app.store";
import { router } from "@/modules/app/app.router";
import { i18n } from "@/modules/app/app.i18n";

createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .mount("#app");
