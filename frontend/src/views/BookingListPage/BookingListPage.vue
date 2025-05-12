<template>
  <v-default>
    <ListControls
      :has-back="false"
      :has-action-button="false"
      title="Управление бронированиями"
      @search="handleSearch"
    />
    <AppTable
      :cols="bookingCols"
      :data="filteredBookings"
      item-page-name="Booking"
      @delete="deleteItem"
    />
    <AppButton class="add-button" @click="addBooking">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Создать бронь</p>
    </AppButton>
    <AppModal v-if="isModalActive" @close="handleCloseModal">
      <template #title>
        <p class="modal__title">Смена временного пароля</p>
      </template>
      <template #subtitle>
        <p class="modal__subtitle">
          Вы вошли в систему по временному паролю. Пожалуйста, смените пароль на
          постоянный
        </p>
      </template>
      <template #inputs>
        <AppInput
          v-model="passwordData.oldPassword"
          type="password"
          placeholder="Введите временный пароль"
          :error="getErrorMessage(v$.oldPassword)"
          :validation="v$.oldPassword"
        />
        <AppInput
          v-model="passwordData.newPassword"
          type="password"
          placeholder="Введите новый пароль"
          :error="getErrorMessage(v$.newPassword)"
          :validation="v$.newPassword"
        />
      </template>
      <template #buttons>
        <AppButton @click="handleChangePassword">Сохранить</AppButton>
      </template>
    </AppModal>
    <AppNotification
      v-if="notification.isVisible"
      :type="notification.type"
      @close="hideNotification"
    >
      {{ notification.message }}
    </AppNotification>
  </v-default>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import AppModal from "../../components/AppModal/AppModal.vue";
import AppInput from "../../components/AppInput/AppInput.vue";
import AppButton from "../../components/AppButton/AppButton.vue";
import AppNotification from "../../components/AppNotification/AppNotification.vue";
import { useAuthStore } from "../../stores/auth";
import { useNotification } from "../../hooks/useNotification";
import { useVuelidate } from "@vuelidate/core";
import { changePassword } from "../../services/userApi";
import { getErrorMessage } from "../../helpers/errorHelpers";
import { passwordValidationRules } from "./validationRules";
import AppTable from "../../components/AppTable/AppTable.vue";
import AppIcon from "../../components/AppIcon/AppIcon.vue";
import ListControls from "../../components/ListControls/ListControls.vue";

const authStore = useAuthStore();
const { notification, showNotification, hideNotification } = useNotification();

const isModalActive = ref(false);
const bookings = ref();
const searchQuery = ref("");

const passwordData = reactive({
  oldPassword: "",
  newPassword: "",
});

const v$ = useVuelidate(passwordValidationRules, passwordData);

const handleChangePassword = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  const response = await changePassword(
    authStore.user.restaurantId,
    authStore.user.id,
    passwordData.oldPassword,
    passwordData.newPassword
  );

  if (response) {
    authStore.updateUser({ isTempPassword: false });

    showNotification("Пароль успешно изменён!", "success");
    isModalActive.value = false;
  } else showNotification("Ошибка при изменении пароля!");
};

const init = async () => {
  //bookings.value = await getBookings();

  if (authStore.user?.isTempPassword) {
    isModalActive.value = true;
  }
};

onMounted(init);
</script>

<style scoped lang="scss">
@import "./BookingListPage.scss";
</style>
