<template>
  <div class="layout">
    <AppHeader />
    <div class="layout__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "../AppHeader";
</script>

<style scoped lang="scss">
@import "./DefaultLayout";
</style>
