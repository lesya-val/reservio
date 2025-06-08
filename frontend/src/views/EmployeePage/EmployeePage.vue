<template>
  <v-default class="employee">
    <ListControls
      :has-search="false"
      :has-back="!createMode"
      :is-new-doc="createMode"
      :is-edit-mode="isEditMode"
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
  </v-default>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { AppForm, VDefault, ListControls } from "@/components";
import { useVuelidate } from "@vuelidate/core";

import { showNotification } from "@/hooks/useNotification";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "@/services/userApi";
import { updateRestaurant } from "@/services/restaurantApi";
import { adminValidationRules } from "./validationRules";
import { cleanData } from "@/helpers/dataHelpers";
import { isCreateMode, userRole } from "@/helpers/routeHelpers";
import employeeCols from "../EmployeeListPage/employeeCols";

import { Role, User } from "@/types";

const router = useRouter();
const route = useRoute();

const createMode = ref(isCreateMode());
const isEditMode = ref(false);

// Данные сотрудника
const adminData = reactive({
  id: 0,
  name: "",
  surname: "",
  phone: "",
  email: "",
  role: Role.EMPLOYEE,
  restaurantId: +route.params.restaurantId,
});

const v$ = useVuelidate(adminValidationRules, adminData);

// Фильтр колонок
const filteredAdminCols = computed(() =>
  employeeCols.filter(
    (el, index) => index !== 0 && el.id !== "delete" && el.id !== "role"
  )
);

// Заголовок формы
const formTitle = computed(() => {
  const isSystemAdmin = userRole() === "SYSTEM_ADMIN";
  if (createMode.value) {
    return isSystemAdmin
      ? "Добавление администратора"
      : "Добавление сотрудника";
  }
  return isSystemAdmin
    ? "Информация об администраторе"
    : "Информация о сотруднике";
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  try {
    const payload = cleanData<User>(adminData);

    let result;

    if (createMode.value) {
      if (userRole() === "SYSTEM_ADMIN") {
        const admin = await createEmployee(adminData.restaurantId, {
          ...payload,
          role: Role.RESTAURANT_ADMIN,
        });
        result = await updateRestaurant(adminData.restaurantId, {
          adminId: admin.id,
        });
      } else {
        result = await createEmployee(adminData.restaurantId, payload);
      }
    } else {
      result = await updateEmployee(
        adminData.restaurantId,
        adminData.id,
        payload
      );
    }

    if (result) {
      showNotification(
        createMode.value
          ? "Сотрудник успешно сохранен!"
          : "Сотрудник успешно обновлен!",
        "success"
      );


      const redirectName =
        userRole() === "SYSTEM_ADMIN" ? "RestaurantList" : "EmployeeList";

      await router.push({ name: redirectName });
    }
  } catch (e) {
    console.error(e);
    showNotification("Ошибка при сохранении сотрудника!");
  }
};

onMounted(async () => {
  if (!createMode.value) {
    try {
      const employee = await getEmployeeById(
        adminData.restaurantId,
        +route.params.id
      );
      Object.assign(adminData, employee);
    } catch (e) {
      showNotification("Ошибка загрузки сотрудника");
    }
  }
});
</script>

<style scoped lang="scss">
@import "./EmployeePage.scss";
</style>
