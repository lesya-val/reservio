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
        <AppButton v-if="!isEditMode && !isNewDoc" @click="$emit('edit')">
          Редактировать
        </AppButton>

        <template v-else>
          <AppButton view="outlined" @click="goBack">
            {{ cancelButtonText }}
          </AppButton>
          <AppButton @click="$emit('save')">{{ actionButtonText }}</AppButton>
        </template>
      </div>
    </div>

    <div v-if="hasSearch" class="list-controls__row">
      <Search class="list-controls__search" @search="$emit('search', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppButton, AppIcon, Search } from "../index";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  title: String,
  cancelButtonText: { type: String, default: "Отмена" },
  actionButtonText: { type: String, default: "Сохранить" },
  hasSearch: { type: Boolean, default: true },
  hasBack: { type: Boolean, default: true },
  hasActionButton: { type: Boolean, default: true },
  isNewDoc: { type: Boolean, default: false },
  isEditMode: { type: Boolean, default: false },
});

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped lang="scss">
@import "./ListControls";
</style>
