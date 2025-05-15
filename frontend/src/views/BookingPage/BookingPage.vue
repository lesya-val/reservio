<template>
  <v-default class="booking">
    <ListControls
      :has-search="false"
      :is-new-doc="createMode"
      :is-edit-mode="isEditMode"
      :has-back="!createMode"
      :title="createMode ? 'Создание брони' : 'Информация о брони'"
      @edit="isEditMode = true"
      @save="handleSave"
    />

    <div class="wrapper">
      <div class="booking__content">
        <div class="booking__layout">
          <div class="booking__top-section">
            <AppInput
              v-model="bookingData.guestsCount"
              placeholder="Количество гостей"
              type="number"
              :min="1"
              :options="guestsOptions"
              :readonly="!(createMode || isEditMode)"
            />
            <div class="section">
              <label
                v-if="!(createMode || isEditMode)"
                :class="['input__label']"
              >
                Дата
              </label>
              <VueDatePicker
                v-model="date"
                placeholder="Дата"
                model-type="yyyy-MM-dd"
                :auto-apply="true"
                :enable-time-picker="false"
                :readonly="!(createMode || isEditMode)"
                :format="formattedDate"
                :class="{
                  'input__date--readonly': !(createMode || isEditMode),
                }"
              />
            </div>
            <div class="section">
              <label
                v-if="!(createMode || isEditMode)"
                :class="['input__label']"
              >
                Время
              </label>
              <VueDatePicker
                v-model="time"
                time-picker
                placeholder="Время"
                model-type="HH:mm"
                timezone="UTC"
                :readonly="!(createMode || isEditMode)"
                :class="{
                  'input__date--readonly': !(createMode || isEditMode),
                }"
              />
            </div>
            <AppInput
              v-model="bookingData.name"
              placeholder="Имя клиента"
              :validation="v$.name"
              :error="getErrorMessage(v$.name)"
              :readonly="!(createMode || isEditMode)"
            />

            <AppInput
              v-model="bookingData.phone"
              placeholder="Телефон"
              :validation="v$.phone"
              :error="getErrorMessage(v$.phone)"
              :readonly="!(createMode || isEditMode)"
            />
            <textarea
              v-if="bookingData.notes"
              v-model="bookingData.notes"
              placeholder="Пожелания"
              :readonly="!(createMode || isEditMode)"
            >
            </textarea>
            <AppSelect
              v-if="!createMode"
              v-model="bookingData.status"
              :label="createMode || isEditMode ? '' : 'Статус'"
              :readonly="!(createMode || isEditMode)"
              :options="statusOptions"
            />
          </div>

          <div class="booking__bottom-section">
            <AppSelect
              v-model="bookingData.hallId"
              :label="!(createMode || isEditMode) ? 'Зал' : 'Выберите зал'"
              placeholder="Зал не выбран"
              :options="hallsOptions"
              :readonly="!(createMode || isEditMode)"
              @update:modelValue="selectedHall"
            />

            <div class="schema-container">
              <TablesGrid
                :tables="tables"
                :readonly="true"
                :clickable="createMode || isEditMode"
                :selected-table-id="bookingData.tableId"
                @update:tables="(val) => (tables = val)"
                @update:selected-table="selectedTable"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-default>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import {
  AppInput,
  AppSelect,
  VDefault,
  ListControls,
  TablesGrid,
} from "@/components";
import { getErrorMessage } from "@/helpers/errorHelpers";

import { useVuelidate } from "@vuelidate/core";
import { bookingValidationRules } from "./validationRules";
import { isCreateMode } from "@/helpers/routeHelpers";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { BookingStatus, statusMap, type Booking } from "@/types";
import { getHallById, getHalls } from "@/services/hallsApi";
import { showNotification } from "@/hooks/useNotification";
import {
  createBooking,
  getBookingById,
  updateBooking,
} from "@/services/bookingApi";
import { useRoute, useRouter } from "vue-router";
import { formattedDate } from "@/helpers/dataHelpers";
import { getTableById } from "@/services/tableApi";

const route = useRoute();
const router = useRouter();

const tables = ref();

const halls = ref();
const hallsOptions = ref();

const date = ref("");
const time = ref("");

const statusOptions = Object.entries(statusMap).map(([value, label]) => ({
  value,
  label,
}));

// true если создаём новую бронь
const createMode = isCreateMode();

// Включает режим редактирования
const isEditMode = ref(false);

// Данные бронирования
let bookingData = reactive<Booking>({
  status: BookingStatus.NEW,
  guestsCount: undefined,
  dateTime: "",
  name: "",
  phone: "",
  notes: "",
  tableId: undefined,
  hallId: undefined,
});

// Получение ошибок валидации
const v$ = useVuelidate(bookingValidationRules, bookingData);

const guestsOptions = Array.from({ length: 50 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
}));

const selectedHall = async (id) => {
  const hall = await getHallById(id);
  bookingData.hallId = +id;
  tables.value = hall.tables;
};

const selectedTable = async (table) => {
  bookingData.tableId = table;
};

const handleSave = async () => {
  // const isValid = await v$.value.$validate();
  // if (!isValid) {
  //   showNotification("Заполните поля в соответствии с правилами!");
  //   return;
  // }

  const payload = {
    ...bookingData,
    guestsCount: +bookingData.guestsCount,
    dateTime: new Date(`${date.value}T${time.value}:00`),
  };

  console.log(
    new Date(`${date.value}T${time.value}:00`),
    `${date.value}T${time.value}:00`
  );

  try {
    if (createMode.value) {
      const result = await createBooking(payload);
      if (result) {
        showNotification("Бронь успешно создана!", "success");
      }
    } else {
      const result = await updateBooking(+route.params.id, payload);
      if (result) {
        showNotification("Бронь успешно обновлена!", "success");
        isEditMode.value = false;
      }
    }
    await router.push({ name: "BookingList" });
  } catch (e) {
    showNotification("Ошибка при сохранении ресторана!");
  }
};

onMounted(async () => {
  halls.value = await getHalls();
  hallsOptions.value = Object.values(halls.value).map((hall) => ({
    label: hall.name,
    value: hall.id,
  }));

  if (!createMode.value) {
    try {
      const data = await getBookingById(+route.params.id);
      const table = await getTableById(data.tableId);
      const hall = await getHallById(table.hallId);

      const [dateStr, timeStr] = data.dateTime.split("T");
      date.value = dateStr;
      time.value = timeStr?.slice(0, 5) || "";

      bookingData.status = data.status;
      bookingData.guestsCount = data.guestsCount;
      bookingData.name = data.name;
      bookingData.phone = data.phone;
      bookingData.hallId = table.hallId;
      bookingData.tableId = data.tableId;
      tables.value = hall.tables;
    } catch (e) {
      showNotification("Ошибка при загрузке брони");
    }
  }
});
</script>

<style scoped lang="scss">
@import "./BookingPage.scss";
</style>
