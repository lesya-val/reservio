<template>
  <div class="pre-booking">
    <transition-group name="slide" mode="in-out">
      <div
        v-for="request in pendingRequests"
        :key="request.id"
        class="pre-booking__card"
      >
        <h4>Новая заявка</h4>
        <p><strong>Имя:</strong> {{ request.name }}</p>
        <p><strong>Телефон:</strong> {{ request.phone }}</p>
        <p><strong>Дата:</strong> {{ formattedDate(request.dateTime) }}</p>
        <p><strong>Гостей:</strong> {{ request.guestsCount }}</p>

        <div class="pre-booking__card-actions">
          <AppButton
            class="pre-booking__card-button"
            @click="confirmRequest(request)"
          >
            Перейти
          </AppButton>
          <AppButton view="text" @click="rejectRequest(request)">
            Отказать
          </AppButton>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppButton from "@/components/AppButton";
import {
  getPendingRequests,
  acceptPreBooking,
  rejectPreBooking,
} from "@/services/preBookingApi";
import { useRouter } from "vue-router";
import { formattedDate } from "@/helpers/dataHelpers";
import { io } from "socket.io-client";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const pendingRequests = ref([]);

onMounted(() => {
  if (!useAuthStore().user) return;

  const socket = io("https://reservio-backend.onrender.com/", {
    query: {
      restaurantId: useAuthStore().user.restaurantId,
    },
  });

  socket.on("new-pre-booking", (request) => {
    pendingRequests.value.push(request);
  });
});

// При подтверждении → переход к выбору стола
const confirmRequest = (request) => {
  router.push({
    name: "Booking",
    params: { id: "create" },
    query: {
      name: request.name,
      email: request.email,
      phone: request.phone,
      guestsCount: request.guestsCount,
      dateTime: request.dateTime,
      notes: request.notes,
    },
  });
};

const rejectRequest = async (request) => {
  await rejectPreBooking(request);
  pendingRequests.value = pendingRequests.value.filter(
    (r) => r.id !== request.id
  );
  await router.push({ name: "BookingList" });
};
</script>

<style lang="scss" scoped>
@import "./PreBookingNotifications.scss";
</style>
