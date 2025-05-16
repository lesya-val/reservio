<template>
  <div class="list-controls">
    <div class="list-controls__row">
      <div class="list-controls__left">
        <AppButton
          v-if="hasBack"
          class="list-controls__go-back"
          view="text"
          @click="goBack"
        >
          <template #icon-before>
            <AppIcon value="arrow-left" />
          </template>
          <p>Назад</p>
        </AppButton>

        <div class="list-controls__title">{{ title }}</div>
      </div>

      <div v-if="hasActionButton" class="list-controls__right">
        <AppButton v-if="!isEditMode && !isNewDoc" @click="emit('edit')">
          Редактировать
        </AppButton>

        <template v-else>
          <AppButton view="outlined" @click="goBack">
            {{ cancelButtonText }}
          </AppButton>
          <AppButton @click="emit('save')">{{ actionButtonText }}</AppButton>
        </template>
      </div>
    </div>

    <div v-if="hasDateSelector" class="list-controls__row">
      <div class="list-controls__date-selector">
        <AppIcon style="rotate: 180deg" value="right" @click="prevDay" />
        <span>
          {{ formattedDate(currentDate) }}
        </span>
        <AppIcon value="right" @click="nextDay" />
      </div>
      <VueDatePicker
        v-model="currentDate"
        :hide-input="true"
        :auto-apply="true"
        :enable-time-picker="false"
        @update:model-value="handleDateChange"
      />
    </div>

    <div
      v-if="hasSearch"
      style="justify-content: end"
      class="list-controls__row"
    >
      <Search class="list-controls__search" @search="emit('search', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppButton, AppIcon, Search } from "../index";
import { useRouter } from "vue-router";
import { formattedDate } from "@/helpers/dataHelpers";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();

const currentDate = ref(new Date());

const emit = defineEmits<{
  (e: "save"): void;
  (e: "edit"): void;
  (e: "search", ev: Event): void;
  (e: "update:date", date: Date): void;
}>();

const handleDateChange = (newDate) => emit("update:date", newDate);

defineProps({
  title: String,
  cancelButtonText: { type: String, default: "Отмена" },
  actionButtonText: { type: String, default: "Сохранить" },
  hasSearch: { type: Boolean, default: true },
  hasBack: { type: Boolean, default: true },
  hasActionButton: { type: Boolean, default: true },
  hasDateSelector: { type: Boolean, default: false },
  isNewDoc: { type: Boolean, default: false },
  isEditMode: { type: Boolean, default: false },
});

const goBack = () => {
  router.go(-1);
};

const prevDay = () => {
  currentDate.value = new Date(
    currentDate.value.setDate(currentDate.value.getDate() - 1)
  );

  handleDateChange(currentDate.value);
};

const nextDay = () => {
  currentDate.value = new Date(
    currentDate.value.setDate(currentDate.value.getDate() + 1)
  );

  handleDateChange(currentDate.value);
};
</script>

<style scoped lang="scss">
@import "./ListControls";
</style>
