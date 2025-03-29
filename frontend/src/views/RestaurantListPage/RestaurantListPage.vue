<template>
  <v-default>
    <ListControls
      :has-back="false"
      :has-action-button="false"
      title="Управление ресторанами"
    />
    <AppTable
      class="list-page"
      :cols="tableCols"
      :data="restaurants"
      @delete="deleteItem"
    />
  </v-default>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppTable from "../../components/AppTable/AppTable.vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";

import tableCols from "./tableCols";

import {
  fetchRestaurants,
  deleteRestaurant,
} from "../../services/restaurantApi";

const restaurants = ref();

const loadRestaurants = async () => {
  restaurants.value = await fetchRestaurants();
};

const deleteItem = async (item) => {
  await deleteRestaurant(item.id);
  restaurants.value = restaurants.value.filter((i) => i.id !== item.id);
};

onMounted(() => {
  loadRestaurants();
});
</script>

<style scoped lang="scss">
@import "./RestaurantListPage.scss";
</style>
