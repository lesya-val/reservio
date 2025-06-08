<template>
  <div class="search">
    <AppIcon class="search__icon" value="search" width="24px" height="24px" />
    <AppInput
      class="search__input"
      v-model="searchValue"
      :placeholder="'Поиск'"
      :view="'text'"
      @input="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { AppIcon, AppInput } from "../index";

const searchValue = ref("");

const emit = defineEmits(["search"]);

const handleSearch = () => {
  emit("search", searchValue.value);
};
</script>

<style scoped lang="scss">
@import "./Search.scss";
</style>