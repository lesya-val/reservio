<template>
  <v-default class="restaurant">
    <ListControls
      :has-search="false"
      :is-new-doc="isOpCreate"
      :is-edit-mode="isEditMode"
      :has-back="!isOpCreate"
      @edit="isEditMode = true"
      @save="handleSave"
    />
    <div class="restaurant__wrapper">
      <div class="restaurant__content">
        <h2 class="restaurant__title">
          {{ isOpCreate ? "Добавление ресторана" : "Информация о ресторане" }}
        </h2>
        <div class="restaurant__fields">
          <div v-for="col in filteredRestaurantCols" class="restaurant__field">
            <AppInput
              v-if="col.id === 'isActive'"
              class="restaurant__checkbox"
              type="checkbox"
              label="Ресторан активен"
              v-model="restaurantData[col.id]"
              :readonly="!(isOpCreate || isEditMode)"
            />
            <AppInput
              v-else
              :placeholder="`Укажите ${col.name?.toLowerCase()}`"
              :label="col.name"
              v-model="restaurantData[col.id]"
              :error="getErrorMessage(restaurantValid[col.id])"
              :readonly="!(isOpCreate || isEditMode)"
              :validation="restaurantValid[col.id]"
            />
          </div>
        </div>
        <AppButton v-if="!isOpCreate" @click="goToAdminForm">
          Редактировать данные администратора
        </AppButton>
      </div>
    </div>
    <AppNotification v-if="isNotificationActive" type="error">
      Заполните поля в соответствии с правилами!
    </AppNotification>
  </v-default>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import AppInput from "../../components/AppInput/AppInput.vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";
import { useRouter, useRoute } from "vue-router";
import { Restaurant, TableColumn } from "../../types";

import restaurantCols from "../RestaurantListPage/restaurantCols.json";
import {
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
} from "../../services/restaurantApi";
import { useVuelidate } from "@vuelidate/core";
import { restaurantValidationRules } from "./validationRules";
import { cleanData } from "../../helpers/dataHelpers";
import { getErrorMessage } from "../../helpers/errorHelpers";
import AppNotification from "../../components/AppNotification/AppNotification.vue";
import AppButton from "../../components/AppButton/AppButton.vue";

const router = useRouter();
const route = useRoute();

const restaurantId = computed(() => route.params.id as string);
const isOpCreate = computed(() => restaurantId.value === "create");

const adminId = ref();
const isEditMode = ref(false);
const isNotificationActive = ref(false);

const restaurantData = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  workingHours: "",
  adminId: null,
  isActive: true,
});

const restaurantValid = useVuelidate(restaurantValidationRules, restaurantData);

const filteredRestaurantCols = computed(() => {
  return restaurantCols.filter(
    (col: TableColumn, index: number) => col.name && index !== 0
  );
});

const handleSave = async () => {
  const isValid = await restaurantValid.value.$validate();

  if (!isValid) {
    isNotificationActive.value = false;
    setTimeout(() => {
      isNotificationActive.value = true;
    }, 0);
    return;
  }

  const cleanedData = cleanData<Restaurant>(restaurantData);

  if (isOpCreate.value) {
    const response = await createRestaurant(cleanedData);

    await router.push({
      name: "Employee",
      params: { restaurantId: response.id, id: "create" },
    });
  } else {
    await updateRestaurant(+restaurantId.value, cleanedData);

    isEditMode.value = false;
  }
};

const goToAdminForm = async () => {
  await router.push({
    name: "Employee",
    params: { restaurantId: restaurantId.value, id: adminId.value },
  });
};

onMounted(async () => {
  if (!isOpCreate.value) {
    const restaurant = await getRestaurantById(+restaurantId.value);
    Object.assign(restaurantData, restaurant);

    adminId.value = restaurantData.adminId;
  }
});
</script>

<style src="./RestaurantPage.scss" scoped lang="scss"></style>
