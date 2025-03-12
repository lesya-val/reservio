import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage/RestaurantListPage.vue";

const routes = [
  { path: "/", name: "App", component: App },
  { path: "/restaurant-list", name: "RestaurantListPage", component: RestaurantListPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
