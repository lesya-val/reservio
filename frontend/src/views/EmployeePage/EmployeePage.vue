<template>
  <v-default class="employee">
    <ListControls
      :has-search="false"
      :is-new-doc="createMode"
      :is-edit-mode="isEditMode"
      :has-back="!createMode"
      @edit="isEditMode = true"
      @save="handleSubmit"
    />
    <div class="wrapper">
      <div class="employee__content">
        <AppForm
          :title="formTitle"
          :model="adminData"
          :cols="filteredAdminCols"
          :validation="v$"
          :readonly="!(createMode || isEditMode)"
        />
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

import { AppNotification, AppForm, VDefault, ListControls } from "@/components";
import { useRouter, useRoute } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { useNotification } from "@/hooks/useNotification";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "@/services/userApi";
import { updateRestaurant } from "@/services/restaurantApi";
import { adminValidationRules } from "./validationRules";
import { cleanData } from "@/helpers/dataHelpers";
import { isCreateMode } from "@/helpers/routeHelpers";
import employeeFields from "./employeeFields.json";
import { Role, User } from "@/types";

const router = useRouter();
const route = useRoute();
const createMode = isCreateMode();
const { notification, showNotification } = useNotification();
const isEditMode = ref(false);

const adminData = reactive({
  id: 0,
  name: "",
  surname: "",
  phone: "",
  email: "",
  role: Role.RESTAURANT_ADMIN,
  restaurantId: +route.params.restaurantId,
});

const v$ = useVuelidate(adminValidationRules, adminData);

const filteredAdminCols = computed(() =>
  employeeFields.filter((_, index) => index !== 0)
);

const formTitle = computed(() =>
  createMode.value
    ? "Добавление администратора"
    : "Информация об администраторе"
);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  const cleanedData = cleanData<User>(adminData);

  try {
    if (createMode.value) {
      const admin = await createEmployee(adminData.restaurantId, cleanedData);
      await updateRestaurant(adminData.restaurantId, { adminId: admin.id });
    } else {
      await updateEmployee(adminData.restaurantId, adminData.id, cleanedData);
    }
    showNotification(
      createMode.value
        ? "Сотрудник успешно сохранен!"
        : "Сотрудник успешно обновлен!",
      "success"
    );
    await router.push({ name: "RestaurantList" });
  } catch {
    showNotification("Ошибка при сохранении сотрудника!");
  }
};

onMounted(async () => {
  if (!createMode.value) {
    const employee = await getEmployeeById(
      adminData.restaurantId,
      +route.params.id
    );
    Object.assign(adminData, employee);
  }
});
</script>

<style scoped lang="scss">
@import "./EmployeePage.scss";
</style>
