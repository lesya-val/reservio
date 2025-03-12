<template>
  <div class="layout">
    <AppHeader />
    <div class="layout__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "../AppHeader/AppHeader.vue";
</script>

<style scoped lang="scss">
@import "./DefaultLayout";
</style>
