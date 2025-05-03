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
  </v-default>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

import AppButton from "../../components/AppButton/AppButton.vue";
import AppTable from "../../components/AppTable/AppTable.vue";
import AppIcon from "../../components/AppIcon/AppIcon.vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";

import restaurantCols from "./restaurantCols";

import { getRestaurants, deleteRestaurant } from "../../services/restaurantApi";

const restaurants = ref();
const searchQuery = ref("");

const router = useRouter();

const filteredRestaurants = computed(() => {
  if (!searchQuery.value) {
    return restaurants.value;
  }

  const query = searchQuery.value.toLowerCase();

  return restaurants.value.filter((restaurant) => {
    return Object.values(restaurant).some((value) => {
      return String(value).toLowerCase().includes(query);
    });
  });
});

const init = async () => {
  restaurants.value = await getRestaurants();
};

const deleteItem = async (item) => {
  await deleteRestaurant(+item.id);
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
