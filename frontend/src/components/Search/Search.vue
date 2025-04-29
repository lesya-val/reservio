<template>
  <div class="search">
    <AppIcon class="search__icon" value="search" width="24px" height="24px" />
    <AppInput
      class="search__input"
      v-model="searchValue"
      :view="'text'"
      :placeholder="'Поиск'"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AppIcon from "../AppIcon/AppIcon.vue";
import AppInput from "../AppInput/AppInput.vue";

const searchValue = ref("");

const emit = defineEmits(["search"]);

watch(searchValue, () => {
  emit("search", searchValue.value);
})
</script>

<style lang="scss" src="./Search.scss"></style>
