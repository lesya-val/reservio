<template>
  <v-default>
    <ListControls
      action-button-text="Добавить"
      :has-search="false"
      @cancel="goBack"
    />
  </v-default>
</template>

<script setup lang="ts">
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";

import { useNavigation } from "../../hooks/useNavigation";

const { goBack } = useNavigation();
</script>

<style src="./RestaurantPage.scss" scoped lang="scss"></style>
