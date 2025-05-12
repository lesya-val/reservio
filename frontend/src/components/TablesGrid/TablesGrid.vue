<template>
  <div class="grid">
    <div class="grid-container">
      <div ref="grid" class="grid-stack" />
    </div>

    <AppButton v-if="showButton" class="add-button" @click="openAddTableModal">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Добавить стол</p>
    </AppButton>

    <AppModal v-if="isModalActive" @close="closeAddTableModal">
      <template #title>
        <p class="grid__modal">Добавление стола</p>
      </template>
      <template #inputs>
        <AppInput
          type="number"
          v-model="tableData.capacity"
          label="Количество человек"
          placeholder="Введите вместимость стола"
          :min="1"
          :validation="v$.capacity"
          :error="getErrorMessage(v$.capacity)"
        />
      </template>
      <template #buttons>
        <AppButton view="outlined" @click="closeAddTableModal">
          Отмена
        </AppButton>
        <AppButton @click="confirmAddTable">Добавить</AppButton>
      </template>
    </AppModal>

    <AppNotification
      v-if="notification.isVisible"
      :type="notification.type"
      @close="hideNotification"
    >
      {{ notification.message }}
    </AppNotification>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { GridStack } from "gridstack";

import {
  AppButton,
  AppIcon,
  AppInput,
  AppModal,
  AppNotification,
} from "../index";

import { getErrorMessage } from "@/helpers/errorHelpers";
import { requiredField } from "@/helpers/validationHelpers";
import useVuelidate from "@vuelidate/core";
import "gridstack/dist/gridstack.min.css";

import { useNotification } from "@/hooks/useNotification";

import { Table } from "@/types";

const props = defineProps<{ tables: Table[]; showButton: boolean }>();
const emit = defineEmits<{ (e: "update:tables", value: Table[]): void }>();

let gs: any;
const grid = ref<HTMLElement | null>(null);

const isModalActive = ref(false);
const tableData = reactive({ capacity: 1 });
const tablesState = reactive<Table[]>([]);

const v$ = useVuelidate({ capacity: { required: requiredField() } }, tableData);
const { notification, showNotification, hideNotification } = useNotification();

// Открытие/закрытие модального окна
const openAddTableModal = () => {
  v$.value.$reset();
  tableData.capacity = 1;
  isModalActive.value = true;
};

const closeAddTableModal = () => {
  isModalActive.value = false;
};

// Размеры стола в зависимости от вместимости
const getSizeByCapacity = (capacity: number) => {
  if (capacity <= 2) return { width: 2, height: 2 };
  if (capacity <= 4) return { width: 3, height: 2 };
  if (capacity <= 6) return { width: 3, height: 3 };
  if (capacity <= 8) return { width: 4, height: 3 };
  return { width: 4, height: 4 };
};

// Добавление нового стола
const confirmAddTable = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showNotification("Необходимо ввести вместимость стола!");
    return;
  }

  const { width, height } = getSizeByCapacity(tableData.capacity);
  const tableNumber = tablesState.length + 1;

  const newTable: Table = {
    number: tableNumber,
    x: 0,
    y: 0,
    width,
    height,
    capacity: tableData.capacity,
  };

  tablesState.push(newTable);

  const widget = gs.addWidget({
    width,
    height,
    minW: width,
    minH: height,
    content: "",
  });

  setTimeout(() => {
    renderTableContent(widget, newTable);
    emit("update:tables", [...tablesState]);
  }, 0);

  closeAddTableModal();
};

// Рендер содержимого элемента стола
const renderTableContent = (widget: HTMLElement, table: Table) => {
  const contentContainer = widget.querySelector(".grid-stack-item-content");
  if (!contentContainer) return;

  contentContainer.innerHTML = `
    <div class="grid-stack-item__info">
      <span class="table-number">Стол ${table.number}</span>
      <span class="table-capacity">${table.capacity} чел.</span>
    </div>
    <span class="delete-icon">×</span>
  `;

  const deleteIcon = contentContainer.querySelector(".delete-icon");
  if (deleteIcon) {
    deleteIcon.addEventListener("click", () =>
      handleDeleteClick(widget, table.number)
    );
  }
};

// Обработка удаления стола
const handleDeleteClick = (widget: HTMLElement, number: number) => {
  gs.removeWidget(widget);
  const index = tablesState.findIndex((t) => t.number === number);
  if (index !== -1) {
    tablesState.splice(index, 1);
    emit("update:tables", [...tablesState]);
  }
};

// Синхронизация состояния столов при изменении пропсов
const setTablesData = (tables: Table[]) => {
  tablesState.splice(0, tablesState.length, ...tables);
  gs.removeAll();

  tables.forEach((table) => {
    const widget = gs.addWidget({
      x: table.x,
      y: table.y,
      width: table.width,
      height: table.height,
      minW: table.width,
      minH: table.height,
      content: "",
    });

    setTimeout(() => renderTableContent(widget, table), 0);
  });
};

watch(
  () => props.tables,
  (newTables) => {
    if (gs) setTablesData(newTables);
  },
  { immediate: true }
);

// Инициализация GridStack
onMounted(() => {
  if (!grid.value) return;

  gs = GridStack.init(
    {
      cellHeight: 30,
      margin: 5,
      column: 30,
      float: true,
      removable: true,
    },
    grid.value
  );

  // Обновление координат при перемещении
  gs.on("change", () => {
    gs.engine.nodes.forEach((node: any) => {
      const el = node.el as HTMLElement;
      const info = el.querySelector(".table-number");
      if (!info) return;

      const match = info.textContent?.match(/Стол (\d+)/);
      if (!match) return;

      const number = parseInt(match[1]);
      const table = tablesState.find((t) => t.number === number);
      if (!table) return;

      table.x = node.x;
      table.y = node.y;
      table.width = node.w;
      table.height = node.h;
    });

    emit("update:tables", [...tablesState]);
  });
});
</script>

<style scoped lang="scss">
@import "./TablesGrid.scss";
</style>
