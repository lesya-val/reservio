import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage/RestaurantListPage.vue";

const routes = [
  { path: "/", name: "App", component: App },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
