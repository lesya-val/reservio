<template>
  <div class="list-controls">
    <div class="list-controls__row">
      <div class="list-controls__left">
        <AppButton
          v-if="hasBack"
          class="list-controls__go-back"
          view="text"
          @click="emit('back')"
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
          <AppButton view="outlined" @click="emit('cancel')">Отмена</AppButton>
          <AppButton @click="emit('save')">Сохранить</AppButton>
        </template>
      </div>
    </div>
    <div v-if="hasSearch" class="list-controls__row">
      <Search class="list-controls__search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppButton from "../AppButton/AppButton.vue";
import AppIcon from "../AppIcon/AppIcon.vue";
import Search from "../Search/Search.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  cancelButtonText: {
    type: String,
    default: "Отмена",
  },
  actionButtonText: {
    type: String,
    default: "Сохранить",
  },
  hasSearch: {
    type: Boolean,
    default: true,
  },
  hasBack: {
    type: Boolean,
    default: true,
  },
  hasActionButton: {
    type: Boolean,
    default: true,
  },
  isNewDoc: {
    type: Boolean,
    default: false,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["back", "cancel", "save", "edit"]);
</script>

<style scoped lang="scss">
@import "./ListControls";
</style>
