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
              :placeholder="`Укажите ${col.name?.toLowerCase()}`"
              :label="col.name"
              :value="formData[col.id]"
              @input="(v: Event) => handleInput(v, col)"
            />
          </div>
        </div>
        <div class="restaurant__form">
          <h2 class="restaurant__title">Добавление администратора ресторана</h2>
          <div v-for="col in filteredAdminCols">
            <AppInput :placeholder="getPlaceholder(col)" :label="col.name" />
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

import { useNavigation } from "../../hooks/useNavigation";
import restaurantCols from "../RestaurantListPage/tableCols.json";
import adminCols from "./tableCols.json";
import { createRestaurant } from "../../services/restaurantApi";

const { goBack } = useNavigation();

const formData = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  workingHours: "",
  isActive: true,
});

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
  await createRestaurant(formData);
};

const handleInput = (e: Event, col: { id: string }) => {
  const target = e.target as HTMLInputElement;
  formData[col.id] = target.value;
};
</script>

<style src="./RestaurantPage.scss" scoped lang="scss"></style>
