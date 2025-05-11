<template>
  <header class="header">
    <div class="header__left" @click="navigateToHome">
      <AppIcon class="header__logo" value="logo" width="64px" height="64px" />
      <h2 class="header__title">Reservio</h2>
    </div>

    <div v-if="!isSystemAdmin" class="header__center">
      <h2>{{ restaurantName }}</h2>
    </div>

    <div class="header__right">
      <nav class="header__nav">
        <ul v-if="!isSystemAdmin" class="header__menu">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :class="[
              'nav__item',
              { 'nav__item--active': isActive(item.route) },
            ]"
            @click="navigate(item.route)"
          >
            <a>{{ item.label }}</a>
          </li>
        </ul>

        <div class="header__profile">
          <AppIcon
            value="user"
            class="header__profile-icon"
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
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import AppIcon from "../index";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const isDropdownOpen = ref(false);

const menuItems = [
  { label: "Залы и столы", route: "HallList" },
  { label: "Сотрудники", route: "EmployeeList" },
];

const userRole = computed(() => authStore?.user?.role);
const restaurantName = computed(() => authStore?.user?.restaurantName || "");
const isSystemAdmin = computed(() => userRole.value === "SYSTEM_ADMIN");

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isActive = (routeName: string) =>
  router.currentRoute.value.name === routeName;

const navigate = (routeName: string) => {
  router.push({ name: routeName });
};

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "Login" });
};

const navigateToHome = () => {
  const routeName = isSystemAdmin.value ? "RestaurantList" : "BookingList";
  router.push({ name: routeName });
};
</script>

<style scoped lang="scss">
@import "./AppHeader.scss";
</style>
