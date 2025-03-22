import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage";
import RestaurantPage from "../views/RestaurantPage";
import LoginPage from "../views/LoginPage";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/restaurants",
    name: "RestaurantListPage",
    component: RestaurantListPage,
  },
  {
    path: "/restaurants/:id",
    name: "RestaurantPage",
    component: RestaurantPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
