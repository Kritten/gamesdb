import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { store } from "@/modules/app/app.store";
import { router } from "@/modules/app/app.router";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
