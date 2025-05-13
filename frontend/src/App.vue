<template>
  <div class="app">
    <router-view />

    <AppNotification
      v-if="notification.isVisible"
      :type="notification.type"
      @close="hideNotification"
    >
      {{ notification.message }}
    </AppNotification>
  </div>
</template>

<script setup lang="ts">
import AppNotification from "@/components/AppNotification";
import { notification, hideNotification } from "@/hooks/useNotification";
</script>

<style scoped lang="scss">
@import "style.scss";
</style>
