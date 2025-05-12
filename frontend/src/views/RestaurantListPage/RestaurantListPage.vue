<template>
  <v-default>
    <ListControls
      :has-back="false"
      :has-action-button="false"
      title="Управление ресторанами"
      @search="(v) => (searchQuery = v)"
    />

    <AppTable
      :cols="restaurantCols"
      :data="filteredRestaurants"
      item-page-name="Restaurant"
      @delete="deleteItem"
    />

    <AppButton class="add-button" @click="addRestaurant">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Добавить ресторан</p>
    </AppButton>
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
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

import {
  AppButton,
  AppTable,
  AppIcon,
  VDefault,
  ListControls,
} from "@/components";

import restaurantCols from "./restaurantCols";
import { getRestaurants, deleteRestaurant } from "@/services/restaurantApi";
import type { Restaurant } from "@/types";
import { useNotification } from "@/hooks/useNotification";

const router = useRouter();

// Подключаем уведомления
const { notification, showNotification, hideNotification } = useNotification();

// Список ресторанов
const restaurants = ref<Restaurant[]>([]);

// Строка поиска
const searchQuery = ref("");

// Фильтрация по всем полям
const filteredRestaurants = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return !query
    ? restaurants.value
    : restaurants.value.filter((r) =>
        Object.values(r).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
});

// Загрузка ресторанов при монтировании
const init = async () => {
  try {
    restaurants.value = await getRestaurants();
  } catch (e) {
    showNotification("Ошибка при получении ресторанов");
  }
};

// Удаление ресторана и обновление списка
const deleteItem = async ({ id }: Restaurant) => {
  try {
    await deleteRestaurant(id);
    restaurants.value = restaurants.value.filter((r) => r.id !== id);
  } catch (e) {
    showNotification("Ошибка при удалении ресторана");
  }
};

// Переход на форму добавления ресторана
const addRestaurant = () => {
  router.push({ name: "Restaurant", params: { id: "create" } });
};

onMounted(init);
</script>

<style scoped lang="scss">
@import "./RestaurantListPage.scss";
</style>
