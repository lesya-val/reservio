import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage";
import RestaurantPage from "../views/RestaurantPage";
import LoginPage from "../views/LoginPage";
import EmployeePage from "../views/EmployeePage/EmployeePage.vue";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/restaurants",
    name: "RestaurantList",
    component: RestaurantListPage,
  },
  {
    path: "/restaurants/:id",
    name: "Restaurant",
    component: RestaurantPage,
  },
  {
    path: "/restaurants/:restaurantId/employees/:id?",
    name: "Employee",
    component: EmployeePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
