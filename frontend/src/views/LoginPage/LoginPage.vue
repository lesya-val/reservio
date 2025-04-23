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
        <form @submit.prevent="handleLogin" class="login__form-inputs">
          <AppInput
            v-model="loginData.email"
            placeholder="Введите email"
            label="Email"
            :error="getErrorMessage(v$.email)"
          />
          <AppInput
            v-model="loginData.password"
            placeholder="Введите пароль"
            label="Пароль"
            type="password"
            :error="getErrorMessage(v$.password)"
          />
          <AppButton class="login__form-button" type="submit">
            Войти
          </AppButton>
        </form>
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
import AppButton from "../../components/AppButton/AppButton.vue";
import AppIcon from "../../components/AppIcon/AppIcon.vue";
import AppInput from "../../components/AppInput/AppInput.vue";
import AppNotification from "../../components/AppNotification/AppNotification.vue";

import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "../../stores/auth";
import { loginValidationRules } from "./validationRules";
import { getErrorMessage } from "../../helpers/errorHelpers";
import { useNotification } from "../../composables/useNotification";

const router = useRouter();
const authStore = useAuthStore();
const { notification, showNotification, hideNotification } = useNotification();

const loginData = reactive({
  email: "",
  password: "",
});

const v$ = useVuelidate(loginValidationRules, loginData);

const handleLogin = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  const success = await authStore.login(loginData, router);
  if (success) {
    showNotification("Вход выполнен успешно!", "success");
  } else {
    showNotification("Неверный email или пароль");
  }
};

const navigateToHome = () => {
  router.push("/");
};
</script>

<style scoped lang="scss">
@import "./LoginPage";
</style>
