<template>
  <div class="widget-form">
    <h2>Забронировать столик</h2>

    <form @submit.prevent="submitBooking" class="booking-widget">
      <AppInput
        v-model="booking.guestsCount"
        placeholder="Количество гостей"
        type="number"
        :min="1"
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
      <AppButton style="background-color: #414b58" type="submit">
        Забронировать
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppInput, AppButton } from "@/components";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { getErrorMessage } from "@/helpers/errorHelpers";
import { bookingValidationRules } from "../BookingPage/validationRules";
import useVuelidate from "@vuelidate/core";
import { formattedDate } from "@/helpers/dataHelpers";

const props = defineProps<{
  restaurantId: number;
}>();

const booking = ref({
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

const submitBooking = async () => {
  try {
    const response = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking.value),
    });

    if (response.ok) {
      alert("Бронь отправлена! Скоро с вами свяжутся.");
    } else {
      alert("Ошибка при отправке");
    }
  } catch (e) {
    console.error(e);
    alert("Не удалось отправить бронь");
}
};
</script>

<style scoped lang="scss">
@import "./WidgetPage";
</style>
