import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage";
import BookingListPage from "../views/BookingListPage";
import RestaurantPage from "../views/RestaurantPage";
import HallsListPage from "../views/HallsListPage/HallsListPage.vue";
import BookingPage from "../views/BookingPage";
import EmployeePage from "../views/EmployeePage";
import HallPage from "../views/HallPage/HallPage.vue";
import LoginPage from "../views/LoginPage";

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
  {
    path: "/bookings",
    name: "BookingList",
    component: BookingListPage,
  },
  {
    path: "/bookings/:id",
    name: "Booking",
    component: BookingPage,
  },
  {
    path: "/halls",
    name: "HallList",
    component: HallsListPage,
  },
  {
    path: "/halls/:id",
    name: "Hall",
    component: HallPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.isAuthenticated) {
    return next("/login");
  }

  next();
});

export default router;
