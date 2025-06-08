<template>
  <div class="app">
    <router-view />

    <PreBookingNotifications />

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
import PreBookingNotifications from "./components/PreBookingNotifications/PreBookingNotifications.vue";
import { notification, hideNotification } from "@/hooks/useNotification";
</script>

<style scoped lang="scss">
@import "style.scss";
</style>
