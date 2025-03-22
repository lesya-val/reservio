<template>
  <div class="login">
    <div @click="navigateToHome" class="login__header">
      <AppIcon
        class="login__header-logo"
        value="logo"
        width="64px"
        height="64px"
      />
      <h2 class="login__header-title">Reservio</h2>
    </div>
    <div class="login__form-wrapper">
      <div class="login__form">
        <div class="login__form-title">Вход</div>
        <div class="login__form-inputs">
          <AppInput placeholder="Введите логин" label="Логин" />
          <AppInput placeholder="Введите пароль" label="Пароль" />
        </div>
        <AppButton class="login__form-button">Войти</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from "../../components/AppButton/AppButton.vue";
import AppIcon from "../../components/AppIcon/AppIcon.vue";
import AppInput from "../../components/AppInput/AppInput.vue";
</script>

<style scoped lang="scss">
@import "./LoginPage";
</style>
