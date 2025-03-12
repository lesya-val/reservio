<template>
  <div class="list-controls">
    <div class="list-controls__title">{{ title }}</div>
    <Search class="list-controls__search" />
  </div>
</template>

<script setup lang="ts">
import Search from "../Search/Search.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([]);
</script>

<style scoped lang="scss">
@import "./ListControls";
</style>
