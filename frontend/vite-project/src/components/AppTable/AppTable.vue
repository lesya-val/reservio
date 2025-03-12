<template>
  <div class="table">
    <table class="table__table">
      <thead class="table__header">
        <tr class="table__row">
          <th
            v-for="col in cols"
            :key="col.id"
            :style="col.style"
            class="table__cell"
          >
            <p>{{ col.name || "" }}</p>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          v-for="item in data"
          :key="item.index"
          class="table__row table__body-row"
        >
          <td
            v-for="col in cols"
            :key="col.id"
            :style="col.style"
            :class="[
              'table__cell',
              { 'table__cell-delete': col.id === 'delete' },
            ]"
            @click="isModalActive = true"
          >
            <div v-if="col.id === 'delete'">
              <AppIcon value="trash" />
            </div>
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
        <AppButton view="outlined" @click="isModalActive = false"
          >Отмена</AppButton
        >
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
import AppIcon from "../AppIcon/AppIcon.vue";
import AppModal from "../AppModal/AppModal.vue";
import AppButton from "../AppButton/AppButton.vue";
import AppNotification from "../AppNotification/AppNotification.vue";

interface TableColumn {
  id: string;
  name?: string;
  style: { [key: string]: string };
}

defineProps<{
  cols: TableColumn[];
  data: () => [{}];
}>();

const isModalActive = ref(false);
const isNotificationActive = ref(false);

const deleteItem = () => {
  isModalActive.value = false;
  isNotificationActive.value = true;
};
</script>

<style scoped lang="scss">
@import "./AppTable";
</style>
