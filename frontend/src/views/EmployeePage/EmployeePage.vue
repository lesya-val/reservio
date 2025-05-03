<template>
  <v-default class="employee">
    <ListControls
      :has-search="false"
      :is-new-doc="isOpCreate"
      :is-edit-mode="isEditMode"
      :has-back="!isOpCreate"
      @edit="isEditMode = true"
      @save="handleSave"
    />
    <div class="employee__wrapper">
      <div class="employee__content">
        <h2 class="employee__title">
          {{
            isOpCreate
              ? "Добавление администратора"
              : "Информация об администраторе"
          }}
        </h2>
        <div class="employee__fields">
          <AppInput
            v-for="col in filteredAdminCols"
            v-model="adminData[col.id]"
            :placeholder="getPlaceholder(col)"
            :label="col.name"
            :error="getErrorMessage(v$[col.id])"
            :readonly="!(isOpCreate || isEditMode)"
          />
        </div>
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
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/userApi";
import { adminValidationRules } from "./validationRules";
import { cleanData } from "../../helpers/dataHelpers";
import { getErrorMessage } from "../../helpers/errorHelpers";
import AppNotification from "../../components/AppNotification/AppNotification.vue";
import useVuelidate from "@vuelidate/core";
import employeeFields from "./employeeFields.json";
import { User, Role, TableColumn } from "../../types";
import { updateRestaurant } from "../../services/restaurantApi";
import { useNotification } from "../../hooks/useNotification";

const router = useRouter();
const route = useRoute();
const { notification, showNotification, hideNotification } = useNotification();

const isOpCreate = computed(() => route.params.id === "create");

const isEditMode = ref(false);
const isNotificationActive = ref(false);

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

const filteredAdminCols = computed(() => {
  return employeeFields.filter((_, index: number) => index !== 0);
});

const getPlaceholder = (col: TableColumn) => {
  if (col.id === "adminSurname") {
    return "Укажите фамилию";
  }
  return col.name ? `Укажите ${col.name.toLowerCase()}` : "";
};

const handleSave = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  const cleanedData = cleanData<User>(adminData);

  if (isOpCreate.value) {
    const admin = await createEmployee(adminData.restaurantId, cleanedData);
    await updateRestaurant(adminData.restaurantId, { adminId: admin.id });
  } else {
    await updateEmployee(adminData.restaurantId, adminData.id, adminData);
  }

  const response = await router.push({ name: "RestaurantList" });

  if (response) showNotification("Сотрудник успешно сохранен", "success");
  else showNotification("Ошибка при сохранении сотрудника");
};

onMounted(async () => {
  const employeeId = route.params.id;

  if (!isOpCreate.value) {
    const employee = await getEmployeeById(adminData.restaurantId, +employeeId);
    Object.assign(adminData, employee);
  }
});
</script>

<style src="./EmployeePage.scss" scoped lang="scss"></style>
