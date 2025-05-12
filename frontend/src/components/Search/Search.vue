<template>
  <div class="search">
    <AppIcon class="search__icon" value="search" width="24px" height="24px" />
    <AppInput
      class="search__input"
      v-model="searchValue"
      :placeholder="'Поиск'"
      :view="'text'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppIcon, AppInput } from "../index";

const searchValue = ref("");

const emit = defineEmits(["search"]);

emit("search", searchValue.value);
</script>

<style scoped lang="scss">
@import "./Search.scss";
</style>
