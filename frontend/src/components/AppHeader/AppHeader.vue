<template>
  <header class="header">
    <div class="header__left" @click="navigateToHome">
      <div class="header__info">
        <AppIcon class="header__logo" value="logo" width="64px" height="64px" />
        <h2 class="header__title">Reservio</h2>
      </div>
      <div v-if="!isSystemAdmin">
        <h2 class="header__restaurant">
          <span class="header__restaurant--prefix">Ресторан</span>
          «{{ restaurantName }}»
        </h2>
      </div>
    </div>

    <div class="header__right">
      <nav class="header__nav nav">
        <ul v-if="userRole !== 'SYSTEM_ADMIN'" class="nav__list">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="nav__item"
            :class="{ 'nav__item--active': isActive(item.route) }"
            @click="navigate(item.route)"
          >
            {{ item.label }}
          </li>
        </ul>

        <div class="header__profile profile">
          <AppIcon
            value="user"
            class="profile__icon"
            width="32px"
            height="32px"
            @click="toggleDropdown"
          />

          <div v-if="isDropdownOpen" class="profile__dropdown dropdown">
            <!-- <div class="dropdown__item" @click="goToProfile">Профиль</div> -->
            <div class="dropdown__item" @click="handleLogout">Выход</div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import AppIcon from "../AppIcon";

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
