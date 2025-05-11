<template>
  <div class="login">
    <div @click="router.push({ name: 'Login' })" class="login__header">
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
        <AppForm
          title="Вход"
          submit-text="Войти"
          :model="loginData"
          :cols="loginCols"
          :validation="v$"
          @submit="handleLogin"
        />
      </div>
    </div>
    <AppNotification
      v-if="notification.isVisible"
      :type="notification.type"
      @close="hideNotification"
    >
      {{ notification.message }}
    </AppNotification>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { AppButton, AppIcon, AppForm, AppNotification } from "@/components";

import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "@/stores/auth";
import { getErrorMessage } from "@/helpers/errorHelpers";
import { useNotification } from "@/hooks/useNotification";

import loginCols from "./loginCols.json";
import { loginValidationRules } from "./validationRules";

const router = useRouter();
const authStore = useAuthStore();
const { notification, showNotification, hideNotification } = useNotification();

const loginData = reactive({
  email: "",
  password: "",
});

const v$ = useVuelidate(loginValidationRules, loginData);

const handleLogin = async () => {
  const success = await authStore.login(loginData, router);
  if (success) {
    showNotification("Вход выполнен успешно!", "success");
  } else {
    showNotification("Неверный email или пароль");
  }
};
</script>

<style scoped lang="scss">
@import "./LoginPage";
</style>
