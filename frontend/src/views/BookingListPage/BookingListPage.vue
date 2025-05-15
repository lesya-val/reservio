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
  </v-default>

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
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";

import {
  AppButton,
  AppTable,
  AppIcon,
  AppInput,
  AppModal,
  VDefault,
  ListControls,
} from "@/components";

import bookingCols from "./bookingCols";
import { useAuthStore } from "../../stores/auth";
import { showNotification } from "../../hooks/useNotification";
import { useVuelidate } from "@vuelidate/core";
import { changePassword } from "../../services/userApi";
import { getErrorMessage } from "../../helpers/errorHelpers";
import { deleteBooking, getBookings } from "@/services/bookingApi";
import { getTableById } from "@/services/tableApi";
import { getHallById } from "@/services/hallsApi";
import { passwordValidationRules } from "./validationRules";
import { statusMap } from "@/types";
import { formattedDate } from "@/helpers/dataHelpers";

const router = useRouter();
const authStore = useAuthStore();

const isModalActive = ref(false);

const bookings = ref();

const searchQuery = ref("");

// Фильтрация по всем полям
const filteredBookings = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return !query
    ? bookings.value
    : bookings.value.filter((r) =>
        Object.values(r).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
});

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

const deleteItem = async ({ id }) => {
  try {
    await deleteBooking(id);
    bookings.value = bookings.value.filter((r) => r.id !== id);
  } catch (e) {
    showNotification("Ошибка при удалении ресторана");
  }
};

const formatBookingData = async (bookings) => {
  const formatted = [];

  for (const booking of bookings) {
    const [dateStr, timeStr] = booking.dateTime.split("T");
    const formatDate = formattedDate(dateStr);
    const formatTime = timeStr?.slice(0, 5) || "";

    let hallName = "Не указан";
    let tableNumber = "";

    if (booking.tableId) {
      try {
        const table = await getTableById(booking.tableId);
        const hall = await getHallById(table.hallId);

        hallName = hall.name;
        tableNumber = table.number;
      } catch (e) {
        console.warn("Столик не найден", booking.tableId);
      }
    }

    formatted.push({
      ...booking,
      date: formatDate,
      time: formatTime,
      hall: hallName,
      table: tableNumber,
      status: statusMap[booking.status] || booking.status,
    });
  }

  return formatted;
};

const init = async () => {
  const rawBookings = await getBookings();
  bookings.value = await formatBookingData(rawBookings);

  if (authStore.user?.isTempPassword) {
    isModalActive.value = true;
  }
};

const addBooking = () => {
  router.push({ name: "Booking", params: { id: "create" } });
};

onMounted(init);
</script>

<style scoped lang="scss">
@import "./BookingListPage.scss";
</style>
