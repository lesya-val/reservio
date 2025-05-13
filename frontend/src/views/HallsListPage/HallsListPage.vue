<template>
  <v-default class="halls">
    <div class="wrapper">
      <ListControls
        :has-back="false"
        :has-action-button="false"
        :has-search="false"
        title="Управление залами"
      />

      <div class="halls__grid">
        <div
          v-for="hall in halls"
          :key="hall.id"
          class="halls__card"
          @click="openHall(hall.id)"
        >
          <div class="halls__card-title">
            {{ hall.name }}
            <AppIcon
              value="close"
              class="halls__card-icon"
              @click.stop="confirmDelete(hall.id)"
            />
          </div>
          <div class="halls__card-info">
            <p>Количество свободных столов:</p>
            <p>{{ hall.capacity }}</p>
          </div>
        </div>
      </div>
    </div>

    <AppModal v-if="isModalActive">
      <template #title>
        <div class="halls__modal">Вы уверены, что хотите удалить зал?</div>
      </template>

      <template #buttons>
        <AppButton view="outlined" @click="isModalActive = false">
          Отмена
        </AppButton>
        <AppButton @click="deleteSelectedHall">Удалить</AppButton>
      </template>
    </AppModal>

    <AppButton class="add-button" @click="addHall">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Добавить зал</p>
    </AppButton>
  </v-default>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  VDefault,
  ListControls,
  AppButton,
  AppIcon,
  AppModal,
} from "@/components";

import { getHalls, deleteHall } from "@/services/hallsApi";
import { showNotification } from "@/hooks/useNotification";

const router = useRouter();
const halls = ref([]);
const isModalActive = ref(false);
const hallToDelete = ref(null);

const openHall = (hallId: number) => {
  router.push({ name: "Hall", params: { id: hallId } });
};

const addHall = () => {
  router.push({ name: "Hall", params: { id: "create" } });
};

const confirmDelete = (hallId: number) => {
  isModalActive.value = true;
  hallToDelete.value = hallId;
};

const deleteSelectedHall = async () => {
  await deleteHall(hallToDelete.value);
  halls.value = halls.value.filter((hall) => hall.id !== hallToDelete.value);
  isModalActive.value = false;
  showNotification("Зал успешно удален!", "success");
};

onMounted(async () => {
  halls.value = await getHalls();
});
</script>

<style scoped lang="scss">
@import "./HallsListPage.scss";
</style>
