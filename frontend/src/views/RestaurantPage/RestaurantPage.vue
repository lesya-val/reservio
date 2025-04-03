<template>
  <v-default class="restaurant">
    <ListControls
      :has-search="false"
      @back="goBack"
      @cancel="goBack"
      @save="handleSave"
    />
    <div class="restaurant__wrapper">
      <div class="restaurant__content">
        <div class="restaurant__form">
          <h2 class="restaurant__title">Добавление ресторана</h2>
          <div v-for="col in filteredRestaurantCols">
            <AppInput
              v-if="col.id === 'isActive'"
              class="restaurant__checkbox"
              :type="'checkbox'"
              :label="'Ресторан активен'"
              :value="restaurantData[col.id]"
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
              @input="
                (v: string) =>
                  handleInput(v, col, restaurantData, restaurantValid)
              "
            />
          </div>
        </div>
        <div class="restaurant__form">
          <h2 class="restaurant__title">Добавление администратора ресторана</h2>
          <div v-for="col in filteredAdminCols">
            <AppInput
              :placeholder="getPlaceholder(col)"
              :label="col.name"
              :value="adminData[col.id]"
              :error="getErrorMessage(adminValid[col.id])"
              @input="(v: string) => handleInput(v, col, adminData, adminValid)"
            />
          </div>
        </div>
      </div>
    </div>
  </v-default>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import AppInput from "../../components/AppInput/AppInput.vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";

import { TableColumn } from "../../types/TableColumn";

import restaurantCols from "../RestaurantListPage/restaurantCols.json";
import adminCols from "./adminFields.json";
import { createRestaurant } from "../../services/restaurantApi";
import { useVuelidate } from "@vuelidate/core";
import {
  adminValidationRules,
  restaurantValidationRules,
} from "./validationRules";
import { getErrorMessage } from "../../helpers/validationUtils";
import { useRouter } from "vue-router";

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

const router = useRouter();

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

const goBack = () => router.push({ name: "RestaurantList" });

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
    console.error("Заполните поля в соответствии с правилами");
    return;
  }

  await createRestaurant(restaurantData);
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
</script>

<style src="./RestaurantPage.scss" scoped lang="scss"></style>
