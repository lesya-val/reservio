<template>
  <div class="header">
    <div @click="navigateToHome" class="header__left">
      <AppIcon
        class="header__left-logo"
        value="logo"
        width="64px"
        height="64px"
      />
      <h2 class="header__left-text">Reservio</h2>
    </div>
    <div v-if="userRole !== 'SYSTEM_ADMIN'" class="header__center">
      <h2 class="header__center-text">{{ authStore?.user?.restaurantName }}</h2>
    </div>
    <div class="header__right">
      <nav class="header__right-nav">
        <ul v-if="userRole !== 'SYSTEM_ADMIN'" class="header__right-list">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :class="['nav__item', { 'nav__item--active': isActive(item.route) }]"
            @click="navigate(item.route)"
          >
            <a>{{ item.label }}</a>
          </li>
        </ul>
        <div class="header__right-profile-container">
          <AppIcon
            value="user"
            class="header__right-profile"
            width="32px"
            height="32px"
            @click="toggleDropdown"
          />
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-menu__item" @click="handleLogout">Выход</div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

import AppIcon from "../AppIcon/AppIcon.vue";

const router = useRouter();
const authStore = useAuthStore();

const isDropdownOpen = ref(false);

const menuItems = [
  { label: "Залы и столы", route: "HallList" },
  { label: "Сотрудники", route: "EmployeeList" },
];

const userRole = computed(() => authStore?.user?.role);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isActive = (routeName) => {
  return router.currentRoute.value.name === routeName;
};

const navigate = (routeName) => {
  router.push({ name: routeName });
};

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "Login" });
};

const navigateToHome = () => {
  if (userRole.value === "SYSTEM_ADMIN") {
    router.push({ name: "RestaurantList" });
  } else {
    router.push({ name: "BookingList" });
  }
};
</script>

<style scoped lang="scss">
@import "./AppHeader";
</style>
