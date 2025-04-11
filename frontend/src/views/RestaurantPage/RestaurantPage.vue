<template>
  <v-default class="restaurant">
    <ListControls
      :has-search="false"
      :is-new-doc="isOpCreate"
      :is-edit-mode="isEditMode"
      @edit="isEditMode = true"
      @back="goBack"
      @cancel="goBack"
      @save="handleSave"
    />
    <div class="restaurant__wrapper">
      <div class="restaurant__content">
        <div class="restaurant__form">
          <h2 class="restaurant__title">
            {{ isOpCreate ? "Добавление ресторана" : "Информация о ресторане" }}
          </h2>
          <div v-for="col in filteredRestaurantCols">
            <AppInput
              v-if="col.id === 'isActive'"
              class="restaurant__checkbox"
              type="checkbox"
              label="Ресторан активен"
              :value="restaurantData[col.id]"
              :readonly="!(isOpCreate || isEditMode)"
              @input="
                (v: string) =>
                  handleInput(v, col, restaurantData, restaurantValid)
              "
            />
            <AppInput
              v-else
              :placeholder="`Укажите ${col.name?.toLowerCase()}`"
              :label="col.name"
              :value="restaurantData[col.id]"
              :error="getErrorMessage(restaurantValid[col.id])"
              :readonly="!(isOpCreate || isEditMode)"
              @input="
                (v: string) =>
                  handleInput(v, col, restaurantData, restaurantValid)
              "
            />
          </div>
        </div>
        <div class="restaurant__form">
          <h2 class="restaurant__title">
            {{
              isOpCreate
                ? "Добавление администратора ресторана"
                : "Информация об администраторе ресторана"
            }}
          </h2>
          <div v-for="col in filteredAdminCols">
            <AppInput
              :placeholder="getPlaceholder(col)"
              :label="col.name"
              :value="adminData[col.id]"
              :error="getErrorMessage(adminValid[col.id])"
              :readonly="!isOpCreate"
              @input="(v: string) => handleInput(v, col, adminData, adminValid)"
            />
          </div>
        </div>
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

import { TableColumn } from "../../types/TableColumn";

import restaurantCols from "../RestaurantListPage/restaurantCols.json";
import adminCols from "./adminFields.json";
import {
  createRestaurant,
  fetchRestaurantById,
  updateRestaurant,
} from "../../services/restaurantApi";
import { useVuelidate } from "@vuelidate/core";
import {
  adminValidationRules,
  restaurantValidationRules,
} from "./validationRules";
import { getErrorMessage } from "../../helpers/validationUtils";
import { useRouter, useRoute } from "vue-router";
import AppNotification from "../../components/AppNotification/AppNotification.vue";

const router = useRouter();
const route = useRoute();

const itemId = computed(() => route.params.id as string);
const isOpCreate = computed(() => itemId.value === "create");

const isEditMode = ref(false);
const isNotificationActive = ref(false);

const restaurantData = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  workingHours: "",
  isActive: true,
});

const adminData = reactive({
  name: "",
  surname: "",
  phone: "",
  email: "",
  password: "",
});

const restaurantValid = useVuelidate(restaurantValidationRules, restaurantData);
const adminValid = useVuelidate(adminValidationRules, adminData);

const filteredRestaurantCols = computed(() => {
  return restaurantCols.filter(
    (col: TableColumn, index: number) => col.name && index !== 0
  );
});

const filteredAdminCols = computed(() => {
  return adminCols.filter((_, index: number) => index !== 0);
});

const getPlaceholder = (col: TableColumn) => {
  if (col.id === "adminSurname") {
    return "Укажите фамилию";
  }
  return col.name ? `Укажите ${col.name.toLowerCase()}` : "";
};

const handleSave = async () => {
  const isRestaurantValid = await restaurantValid.value.$validate();
  const isAdminValid = await adminValid.value.$validate();

  if (!isAdminValid || !isRestaurantValid) {
    isNotificationActive.value = true;
    return;
  }

  if (isOpCreate.value) {
    await createRestaurant(restaurantData);
  } else {
    await updateRestaurant(+itemId.value, restaurantData);
  }
  goBack();
};

const handleInput = (
  value: string,
  col: TableColumn,
  data: any,
  validation: any
) => {
  data[col.id] = value;
  validation[col.id]?.$touch();
};

const goBack = () => router.push({ name: "RestaurantList" });

onMounted(async () => {
  if (!isOpCreate.value) {
    const restaurant = await fetchRestaurantById(itemId.value);
    Object.assign(restaurantData, restaurant);
    Object.assign(adminData, restaurant.admin);
  }
});
</script>

<style src="./RestaurantPage.scss" scoped lang="scss"></style>
