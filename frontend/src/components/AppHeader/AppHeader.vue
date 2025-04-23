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
    <div class="header__center">
      <h2 class="header__center-text">Название ресторана</h2>
    </div>
    <div class="header__right">
      <nav class="header__right-nav">
        <ul class="header__right-list">
          <li><a>Залы и столы</a></li>
          <li><a>Сотрудники</a></li>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

import AppIcon from "../AppIcon/AppIcon.vue";

const router = useRouter();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  const authStore = useAuthStore();
  authStore.logout();
  router.push({ name: "Login" });
};
</script>

<style scoped lang="scss">
@import "./AppHeader";
</style>
