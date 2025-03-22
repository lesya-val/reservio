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
            @click="handleCellClick(item)"
          >
            <AppIcon value="trash" v-if="col.id === 'delete'" />
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
import AppIcon from "../AppIcon/AppIcon.vue";
import AppModal from "../AppModal/AppModal.vue";
import AppButton from "../AppButton/AppButton.vue";
import AppNotification from "../AppNotification/AppNotification.vue";
import { useRouter } from "vue-router";

interface TableColumn {
  id: string;
  name?: string;
  style: { [key: string]: string };
}

const props = defineProps<{
  cols: TableColumn[];
  data: Array<{ [key: string]: any }>;
  routeConfig: {
    name: string;
    params: string;
    query?: { [key: string]: string };
  };
}>();

const emit = defineEmits(["clickItem"]);

const router = useRouter();

const isModalActive = ref(false);
const isNotificationActive = ref(false);

const deleteItem = () => {
  isModalActive.value = false;
  isNotificationActive.value = true;
};

const handleCellClick = (item: { [key: string]: any }) => {
  if (item.col.id === "delete") {
    isModalActive.value = true;
  } else {
    router.push({
      name: props.routeConfig.name,
      params: { id: props.routeConfig.params },
      query: props.routeConfig.query,
    });
  }
};
</script>

<style scoped lang="scss">
@import "./AppTable";
</style>
