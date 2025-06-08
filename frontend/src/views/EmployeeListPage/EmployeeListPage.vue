<template>
  <v-default>
    <ListControls
      :has-back="false"
      :has-action-button="false"
      title="Управление сотрудниками"
      @search="(v) => (searchQuery = v)"
    />

    <AppTable
      :cols="employeeCols"
      :data="filteredEmployees"
      :params="params"
      item-page-name="Employee"
      @delete="deleteItem"
    />

    <AppButton class="add-button" @click="addEmployee">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Добавить сотрудника</p>
    </AppButton>
  </v-default>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import employeeCols from "./employeeCols";

import {
  AppButton,
  AppTable,
  AppIcon,
  VDefault,
  ListControls,
} from "@/components";

import { getEmployeesByRestaurantId, deleteEmployee } from "@/services/userApi";
import { roleMap, type User } from "@/types";
import { showNotification } from "@/hooks/useNotification";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const authStore = useAuthStore();

// Список сотрудников
const employees = ref<User[]>([]);

// Строка поиска
const searchQuery = ref("");

const params = {
  id: authStore.user.id,
  restaurantId: authStore.user.restaurantId,
};

// Фильтрация по всем полям
const filteredEmployees = computed(() => {
  const query = searchQuery.value.toLowerCase();

  const filtered = !query
    ? employees.value
    : employees.value.filter((r) =>
        Object.values(r).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );

  // Сортируем так, чтобы админ был первым
  return filtered.sort((a, b) => {
    if (a.role === "Администратор") return -1;
    if (b.role === "Администратор") return 1;
    return 0;
  });
});

// Загрузка сотрудников при монтировании
const init = async () => {
  try {
    const result = await getEmployeesByRestaurantId(
      authStore.user.restaurantId
    );

    employees.value = result.map((employee) => ({
      ...employee,
      role: roleMap[employee.role] || employee.role,
    }));
  } catch (e) {
    showNotification("Ошибка при получении сотрудников");
  }
};

// Удаление сотрудника и обновление списка
const deleteItem = async ({ id }: User) => {
  try {
    await deleteEmployee(authStore.user.restaurantId, id);
    employees.value = employees.value.filter((r) => r.id !== id);
  } catch (e) {
    showNotification("Ошибка при удалении сотрудника");
  }
};

// Переход на форму добавления сотрудника
const addEmployee = () => {
  router.push({
    name: "Employee",
    params: { restaurantId: authStore.user.restaurantId, id: "create" },
  });
};

onMounted(init);
</script>

<style scoped lang="scss">
@import "./employeeListPage.scss";
</style>
