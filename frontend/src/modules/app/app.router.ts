import { RouteConfig, createRouter, createWebHistory } from "vue-router";
import Login from "@/modules/app/login/login";

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
