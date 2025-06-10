<template>
  <div class="widget-form">
    <h2>Забронировать столик</h2>

    <div class="booking-widget">
      <AppInput
        v-model="booking.guestsCount"
        placeholder="Количество гостей"
        type="number"
        :min="1"
        :error="getErrorMessage(v$.guestsCount)"
      />
      <VueDatePicker
        v-model="booking.date"
        placeholder="Дата"
        model-type="yyyy-MM-dd"
        :auto-apply="true"
        :enable-time-picker="false"
        :format="formattedDate"
      />
      <VueDatePicker
        v-model="booking.time"
        time-picker
        placeholder="Время"
        model-type="HH:mm"
        timezone="UTC"
      />
      <AppInput
        v-model="booking.name"
        placeholder="Имя клиента"
        :validation="v$.name"
        :error="getErrorMessage(v$.name)"
      />
      <AppInput
        v-model="booking.phone"
        placeholder="Телефон"
        :validation="v$.phone"
        :error="getErrorMessage(v$.phone)"
      />
      <AppInput
        v-model="booking.email"
        placeholder="Email"
        :validation="v$.email"
        :error="getErrorMessage(v$.email)"
      />
      <textarea v-model="booking.notes" placeholder="Пожелания" />
      <AppButton @click="submitForm" style="background-color: #414b58">
        Забронировать
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { AppInput, AppButton } from "@/components";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { getErrorMessage } from "@/helpers/errorHelpers";
import { bookingValidationRules } from "../BookingPage/validationRules";
import useVuelidate from "@vuelidate/core";
import { formattedDate } from "@/helpers/dataHelpers";
import { createPreBooking } from "@/services/preBookingApi";

const booking = reactive({
  name: "",
  phone: "",
  email: "",
  guestsCount: "",
  date: "",
  time: "",
  notes: "",
});

// Получение ошибок валидации
const v$ = useVuelidate(bookingValidationRules, booking);

// Получаем restaurantId из props
const props = defineProps<{
  restaurantId: number;
}>();

const submitForm = async () => {
  try {
    // Формируем дату и время в нужном формате
    const dateTime = new Date(
      `${booking.date}T${booking.time}:00`
    ).toISOString();

    await createPreBooking(props.restaurantId, {
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      guestsCount: parseInt(booking.guestsCount),
      dateTime,
      notes: booking.notes,
    });

    alert("Бронирование успешно создано!");

    // Очищаем форму после успешной отправки
    booking = {
      name: "",
      phone: "",
      email: "",
      guestsCount: "",
      date: "",
      time: "",
      notes: "",
    };
  } catch (error) {
    console.error("Ошибка при бронировании:", error);
    alert("Ошибка при бронировании");
  }
};
</script>

<style scoped lang="scss">
@import "./Widget";
</style>
