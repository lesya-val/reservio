<template>
  <div class="table">
    <table class="table__table">
      <thead class="table__header">
        <tr class="table__row">
          <th
            v-for="col in cols"
            :key="col.id"
            :style="col.style"
            class="table__cell table__cell-th"
          >
            <p>{{ col.name || "" }}</p>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          v-for="(item, index) in data"
          :key="item.id"
          class="table__row table__body-row"
        >
          <td
            v-for="col in cols"
            :key="col.id"
            :style="col.style"
            :class="[
              'table__cell',
              { 'table__cell-delete': isDeleteColumn(col) },
            ]"
            @click="handleCellAction(col, item)"
          >
            <span v-if="col.id === 'index'">{{ index + 1 }}</span>
            <span v-else-if="col.id === 'isActive'">
              {{ item.isActive ? "Активен" : "Неактивен" }}
            </span>

            <AppIcon v-else-if="isDeleteColumn(col)" value="trash" />
            <div v-else>{{ item[col.id] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <AppModal v-if="isModalActive">
      <template #title>
        <div class="table__modal">Вы уверены, что хотите удалить объект?</div>
      </template>

      <template #buttons>
        <AppButton view="outlined" @click="isModalActive = false">
          Отмена
        </AppButton>
        <AppButton @click="deleteItem">Удалить</AppButton>
      </template>
    </AppModal>

    <AppNotification
      v-if="isNotificationActive"
      @close="isNotificationActive = false"
    >
      Объект успешно удален!
    </AppNotification>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { AppIcon, AppModal, AppButton, AppNotification } from "../index";

import type { TableColumn } from "@/types";

const props = defineProps<{
  cols: TableColumn[];
  data: Array<{ [key: string]: any }>;
  itemPageName: string;
}>();

const emit = defineEmits<{
  (e: "clickItem", item: any): void;
  (e: "delete", item: any): void;
}>();

const router = useRouter();

const isModalActive = ref(false);
const isNotificationActive = ref(false);
const itemToDelete = ref<any | null>(null);

const isDeleteColumn = (col: TableColumn) => col.id === "delete";

const deleteItem = () => {
  if (itemToDelete.value) {
    emit("delete", itemToDelete.value);
    itemToDelete.value = null;
  }
  isModalActive.value = false;
  isNotificationActive.value = true;
};

const handleCellAction = (col: TableColumn, item: any) => {
  if (isDeleteColumn(col)) {
    isModalActive.value = true;
    itemToDelete.value = item;
  } else {
    router.push({ name: props.itemPageName, params: { id: item.id } });
  }
};
</script>

<style scoped lang="scss">
@import "./AppTable";
</style>
