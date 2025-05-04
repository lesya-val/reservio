import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage";
import BookingListPage from "../views/BookingListPage";
import RestaurantPage from "../views/RestaurantPage";
import BookingPage from "../views/BookingPage";
import EmployeePage from "../views/EmployeePage";
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
    path: "/booking-list",
    name: "BookingListPage",
    component: BookingListPage,
  },
  {
    path: "/bookings/:id",
    name: "Booking",
    component: BookingPage,
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
