<template>
  <v-default class="restaurant">
    <ListControls
      :has-search="false"
      :is-new-doc="createMode"
      :is-edit-mode="isEditMode"
      :has-back="!createMode"
      @edit="isEditMode = true"
      @save="handleSave"
    />

    <div class="wrapper">
      <div class="restaurant__content">
        <AppForm
          :title="
            createMode ? 'Добавление ресторана' : 'Информация о ресторане'
          "
          :model="restaurantData"
          :cols="filteredRestaurantCols"
          :validation="v$"
          :readonly="!(createMode || isEditMode)"
        />
        <AppButton
          v-if="!createMode"
          class="restaurant__button"
          @click="goToAdminForm"
        >
          {{
            restaurantData.adminId
              ? "Редактировать данные администратора"
              : "Добавить администратора"
          }}
        </AppButton>
      </div>
    </div>
  </v-default>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { AppButton, AppForm, VDefault, ListControls } from "@/components";

import restaurantCols from "../RestaurantListPage/restaurantCols.json";
import {
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
} from "@/services/restaurantApi";

import { showNotification } from "@/hooks/useNotification";
import { cleanData } from "@/helpers/dataHelpers";
import { isCreateMode } from "@/helpers/routeHelpers";
import { useVuelidate } from "@vuelidate/core";
import { restaurantValidationRules } from "./validationRules";
import type { Restaurant, TableColumn } from "@/types";

const router = useRouter();
const route = useRoute();

// true если создаём новый ресторан
const createMode = isCreateMode();

// Включает режим редактирования
const isEditMode = ref(false);

// Данные ресторана
const restaurantData = reactive<Restaurant>({
  name: "",
  address: "",
  phone: "",
  email: "",
  adminId: null,
  isActive: true,
});

const formFields = [
  {
    id: "name",
    label: "Email",
    placeholder: "Введите email",
  },
  {
    id: "password",
    label: "Пароль",
    placeholder: "Введите пароль",
    type: "password",
  },
];

// Получение ошибок валидации
const v$ = useVuelidate(restaurantValidationRules, restaurantData);

// ID ресторана из параметра маршрута
const restaurantId = computed(() => route.params.id as string);

// readonly-состояние для полей
const readonly = computed(() => !(createMode || isEditMode.value));

// Фильтруем колонки
const filteredRestaurantCols = computed(() =>
  restaurantCols.filter(
    (col: TableColumn, index: number) => col.name && index !== 0
  )
);

// Сохранение
const handleSave = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  const cleanedData = cleanData<Restaurant>(restaurantData);

  try {
    if (createMode.value) {
      const result = await createRestaurant(cleanedData);
      if (result) {
        showNotification("Ресторан успешно добавлен!", "success");
        await router.push({
          name: "Employee",
          params: { restaurantId: result.id, id: "create" },
        });
      }
    } else {
      const result = await updateRestaurant(+restaurantId.value, cleanedData);
      if (result) {
        showNotification("Ресторан успешно обновлён!", "success");
        isEditMode.value = false;
      }
    }
  } catch (e) {
    showNotification("Ошибка при сохранении ресторана!");
  }
};

// Переход к форме администратора
const goToAdminForm = async () => {
  await router.push({
    name: "Employee",
    params: {
      restaurantId: +restaurantId.value,
      id: restaurantData.adminId ?? "create",
    },
  });
};

// Загрузка данных ресторана при редактировании
onMounted(async () => {
  if (!createMode.value) {
    try {
      const data = await getRestaurantById(+restaurantId.value);
      Object.assign(restaurantData, data);
    } catch (e) {
      showNotification("Ошибка при загрузке ресторана");
    }
  }
});
</script>

<style scoped lang="scss">
@import "./RestaurantPage.scss";
</style>
