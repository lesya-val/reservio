<template>
  <div class="header">
    <div @click="navigateToHome" class="header__left">
      <AppIcon class="header__left-logo" value="logo" width="64px" height="64px" />
      <h2 class="header__left-text">Название сервиса</h2>
    </div>
    <div class="header__center">
      <h2 class="header__center-text">Название ресторана</h2>
    </div>
    <div class="header__right">
      <nav class="header__right-nav">
        <ul class="header__right-list">
          <li>
            <AppButton text="Залы и столы" view="outlined" />
          </li>
          <li>
            <AppButton text="Сотрудники" view="outlined" />
          </li>
        </ul>
        <div class="header__right-profile">
          <img src="../../assets/admin.jpg" alt="profile" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import AppButton from '../AppButton/AppButton.vue';
import AppIcon from '../AppIcon/AppIcon.vue';

const router = useRouter();

const navigateToHome = () => {
  router.push({ name: 'App' });
};
</script>

<style scoped lang="scss">
@import './AppHeader';
</style>
