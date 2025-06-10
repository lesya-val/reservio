import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import App from "../App.vue";
import RestaurantListPage from "../views/RestaurantListPage";
import BookingListPage from "../views/BookingListPage";
import RestaurantPage from "../views/RestaurantPage";
import HallsListPage from "../views/HallsListPage";
import EmployeeListPage from "../views/EmployeeListPage";
import BookingPage from "../views/BookingPage";
import EmployeePage from "../views/EmployeePage";
import HallPage from "../views/HallPage";
import LoginPage from "../views/LoginPage";
import WidgetFrame from "../views/Widget";

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
    path: "/employees",
    name: "EmployeeList",
    component: EmployeeListPage,
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
  {
    path: "/widget",
    name: "Widget",
    component: WidgetFrame,
    meta: { public: true }, // Делаем маршрут публичным
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login", "/widget"];
  const authRequired = !publicPages.includes(to.path);

  // Если страница публичная - пропускаем
  if (!authRequired) {
    return next();
  }

  // Если пользователь не аутентифицирован - редирект на логин
  if (!authStore.isAuthenticated) {
    return next("/login");
  }

  // Если все проверки пройдены - пропускаем
  next();
});

export default router;
