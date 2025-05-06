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
        <h2 class="restaurant__title">
          {{ createMode ? "Добавление ресторана" : "Информация о ресторане" }}
        </h2>
        <div class="restaurant__fields">
          <div v-for="col in filteredRestaurantCols" class="restaurant__field">
            <AppInput
              v-if="col.id === 'isActive'"
              class="restaurant__checkbox"
              type="checkbox"
              label="Ресторан активен"
              v-model="restaurantData[col.id]"
              :readonly="!(createMode || isEditMode)"
            />
            <AppInput
              v-else
              :placeholder="`Укажите ${col.name?.toLowerCase()}`"
              :label="col.name"
              v-model="restaurantData[col.id]"
              :error="getErrorMessage(v$[col.id])"
              :readonly="!(createMode || isEditMode)"
              :validation="v$[col.id]"
            />
          </div>
        </div>
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
    <AppNotification
      v-if="notification.isVisible"
      :type="notification.type"
      @close="hideNotification"
    >
      {{ notification.message }}
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
import { useNotification } from "../../hooks/useNotification";
import { isCreateMode } from "../../helpers/routeHelpers";

const router = useRouter();
const route = useRoute();
const createMode = isCreateMode();
const { notification, showNotification, hideNotification } = useNotification();

const restaurantId = computed(() => route.params.id as string);

const adminId = ref();
const isEditMode = ref(false);
const isNotificationActive = ref(false);

const restaurantData = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  adminId: null,
  isActive: true,
});

const v$ = useVuelidate(restaurantValidationRules, restaurantData);

const filteredRestaurantCols = computed(() => {
  return restaurantCols.filter(
    (col: TableColumn, index: number) => col.name && index !== 0
  );
});

const handleSave = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    isNotificationActive.value = false;
    setTimeout(() => {
      isNotificationActive.value = true;
    }, 0);
    return;
  }

  const cleanedData = cleanData<Restaurant>(restaurantData);

  if (createMode.value) {
    const response = await createRestaurant(cleanedData);

    if (response) showNotification("Ресторан успешно добавлен!", "success");
    else showNotification("Ошибка при создании ресторана!");

    await router.push({
      name: "Employee",
      params: { restaurantId: response.id, id: "create" },
    });
  } else {
    const response = await updateRestaurant(+restaurantId.value, cleanedData);

    if (response) showNotification("Ресторан успешно обновлен!", "success");
    else showNotification("Ошибка при обновлении ресторана!");

    isEditMode.value = false;
  }
};

const goToAdminForm = async () => {
  if (adminId.value) {
    await router.push({
      name: "Employee",
      params: { restaurantId: restaurantId.value, id: adminId.value },
    });
  } else {
    await router.push({
      name: "Employee",
      params: { restaurantId: +restaurantId.value, id: "create" },
    });
  }
};

onMounted(async () => {
  if (!createMode.value) {
    const restaurant = await getRestaurantById(+restaurantId.value);
    Object.assign(restaurantData, restaurant);

    adminId.value = restaurantData.adminId;
  }
});
</script>

<style src="./RestaurantPage.scss" scoped lang="scss"></style>
