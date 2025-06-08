<template>
  <v-default>
    <ListControls
      :has-back="false"
      :has-action-button="false"
      :has-date-selector="true"
      title="Управление бронированиями"
      @search="handleSearch"
      @update:date="onDateChanged"
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

  <AppModal v-if="isModalActive" @close="isModalActive = false">
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

<script setup lang="ts">
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
import { getTables } from "@/services/tableApi";
import { getHalls } from "@/services/hallsApi";
import { passwordValidationRules } from "./validationRules";
import { statusMap } from "@/types";
import { formattedDate } from "@/helpers/dataHelpers";

const router = useRouter();
const authStore = useAuthStore();

// Состояние модального окна смены пароля
const isModalActive = ref(false);

// Список всех броней
const bookings = ref([]);

// Поиск и дата
const searchQuery = ref("");
const selectedDate = ref(new Date());

// Пароль для модалки
const passwordData = reactive({
  oldPassword: "",
  newPassword: "",
});

const v$ = useVuelidate(passwordValidationRules, passwordData);

// Форматирование данных брони (с отложенными полями)
const formatBookingData = async (bookings) => {
  const tables = await getTables();
  const halls = await getHalls();

  return bookings.map((booking) => {
    const [dateStr, timeStr] = booking.dateTime.split("T");
    const formatDate = formattedDate(dateStr);
    const formatTime = timeStr?.slice(0, 5) || "";

    let hallName = "Не указан";
    let tableNumber = null;

    if (booking.tableId) {
      const table = tables.find((t) => t.id === booking.tableId);
      if (table && table.hallId) {
        const hall = halls.find((h) => h.id === table.hallId);

        hallName = hall?.name || "Зал не найден";
        tableNumber = table.number;
      }
    }

    return {
      ...booking,
      date: formatDate,
      time: formatTime,
      hall: hallName,
      table: tableNumber,
      status: statusMap[booking.status] || booking.status,
    };
  });
};

// Фильтрация по дате
const filteredByDate = computed(() => {
  const today = new Date(selectedDate.value);
  const dateStart = new Date(today.setHours(0, 0, 0, 0));
  const dateEnd = new Date(today.setHours(23, 59, 59, 999));

  return bookings.value.filter((booking) => {
    const bookingDate = new Date(booking.dateTime).getTime();
    return (
      bookingDate >= dateStart.getTime() && bookingDate <= dateEnd.getTime()
    );
  });
});

// Фильтрация по строке поиска
const filteredBookings = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return !query
    ? filteredByDate.value
    : filteredByDate.value.filter((r) =>
        Object.values(r).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
});

// Загрузка броней при монтировании
const init = async () => {
  const rawBookings = await getBookings();
  const formatted = await formatBookingData(rawBookings);
  bookings.value = formatted;

  if (authStore.user?.isTempPassword) {
    isModalActive.value = true;
  }
};

// Методы работы с паролем
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
  } else {
    showNotification("Ошибка при изменении пароля!");
  }
};

// Удаление брони
const deleteItem = async ({ id }) => {
  try {
    await deleteBooking(id);
    bookings.value = bookings.value.filter((r) => r.id !== id);
  } catch (e) {
    showNotification("Ошибка при удалении брони");
  }
};

// Поиск
const handleSearch = (v) => {
  searchQuery.value = v;
};

// Изменение даты
const onDateChanged = (date) => {
  selectedDate.value = date;
};

// Создание брони
const addBooking = () => {
  router.push({ name: "Booking", params: { id: "create" } });
};

onMounted(init);
</script>

<style scoped lang="scss">
@import "./BookingListPage.scss";
</style>
