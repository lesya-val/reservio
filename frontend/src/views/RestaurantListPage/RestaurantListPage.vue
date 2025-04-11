<template>
  <v-default>
    <ListControls
      :has-back="false"
      :has-action-button="false"
      title="Управление ресторанами"
    />
    <AppTable
      class="list-page"
      :cols="restaurantCols"
      :data="restaurants"
      item-page-name="Restaurant"
      @delete="deleteItem"
    />
    <AppButton class="add-button" @click="addRestaurant">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Добавить ресторан</p>
    </AppButton>
  </v-default>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import AppButton from "../../components/AppButton/AppButton.vue";
import AppTable from "../../components/AppTable/AppTable.vue";
import AppIcon from "../../components/AppIcon/AppIcon.vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";

import restaurantCols from "./restaurantCols";

import {
  fetchRestaurants,
  deleteRestaurant,
} from "../../services/restaurantApi";

const restaurants = ref();

const router = useRouter();

const init = async () => {
  restaurants.value = await fetchRestaurants();
};

const deleteItem = async (item) => {
  await deleteRestaurant(item.id);
  restaurants.value = restaurants.value.filter((i) => i.id !== item.id);
};

const addRestaurant = () => {
  router.push({
    name: "Restaurant",
    params: { id: "create" },
  });
};

onMounted(init);
</script>

<style scoped lang="scss">
@import "./RestaurantListPage.scss";
</style>
