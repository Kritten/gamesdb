import { RouteConfig, createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
