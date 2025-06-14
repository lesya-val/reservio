<template>
  <div class="grid">
    <div class="grid-container">
      <div ref="grid" class="grid-stack" />
    </div>

    <!-- Кнопка добавления стола -->
    <AppButton v-if="showButton" class="add-button" @click="openAddTableModal">
      <template #icon-after>
        <AppIcon value="plus" width="20px" height="20px" />
      </template>
      <p>Добавить стол</p>
    </AppButton>

    <!-- Модальное окно для добавления -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { GridStack } from "gridstack";

// Компоненты UI-библиотеки
import { AppButton, AppIcon, AppInput, AppModal } from "../index";

// Хелперы
import { getErrorMessage } from "@/helpers/errorHelpers";
import { requiredField } from "@/helpers/validationHelpers";
import useVuelidate from "@vuelidate/core";
import "gridstack/dist/gridstack.min.css";

import { showNotification } from "@/hooks/useNotification";

// Типы
import { Table } from "@/types";

// Props
const props = defineProps<{
  tables: Table[];
  showButton?: boolean;
  selectedTableId?: number | null;
  readonly: boolean;
  clickable: boolean;
  guestsCount?: number;
  dateTime?: string;
}>();

// Emits
const emit = defineEmits<{
  (e: "update:tables", value: Table[]): void;
  (e: "update:selected-table", value: number | null): void;
}>();

let gs: any;
const grid = ref<HTMLElement | null>(null);

// Состояние модального окна и данные формы
const isModalActive = ref(false);
const tableData = reactive({ capacity: 1 });

// Локальное состояние таблиц
const tablesState = reactive<Table[]>([]);
const selectedTable = ref<number | null>(null);

const v$ = useVuelidate({ capacity: { required: requiredField() } }, tableData);

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
    capacity: +tableData.capacity,
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

  // Очистка предыдущего содержимого
  contentContainer.innerHTML = `
    <div class="grid-stack-item__info">
      <span class="table-number">Стол ${table.number}</span>
      <span class="table-capacity">${table.capacity} чел.</span>
      ${!props.readonly ? '<span class="delete-icon">×</span>' : ""}
    </div>
  `;

  // Проверяем вместимость
  const isTableSuitable =
    !props.guestsCount || table.capacity >= props.guestsCount;

  // Проверяем занятость стола
  const isTableBooked = table.bookings?.some((booking) => {
    if (!props.dateTime) return false;

    const bookingDateTime = new Date(booking.dateTime);
    const selectedDateTime = new Date(props.dateTime);

    // Проверяем, что бронирования не пересекаются
    // Допустим, что бронирование длится 2 часа
    const bookingEndTime = new Date(
      bookingDateTime.getTime() + 2 * 60 * 60 * 1000
    );
    const selectedEndTime = new Date(
      selectedDateTime.getTime() + 2 * 60 * 60 * 1000
    );

    return (
      (selectedDateTime >= bookingDateTime &&
        selectedDateTime < bookingEndTime) ||
      (selectedEndTime > bookingDateTime &&
        selectedEndTime <= bookingEndTime) ||
      (selectedDateTime <= bookingDateTime && selectedEndTime >= bookingEndTime)
    );
  });

  if (!isTableSuitable) {
    contentContainer.classList.add("grid-stack-item--disabled");
  }

  if (isTableBooked) {
    contentContainer.classList.add("grid-stack-item--booked");
  }

  if (props.selectedTableId && props.selectedTableId === table.id) {
    contentContainer.classList.add("grid-stack-item--selectable");
    contentContainer.classList.add("grid-stack-item--selected");
    selectedTable.value = table.id;
  }

  if (props.clickable) {
    // Добавляем класс для клика только если стол доступен
    if (isTableSuitable && !isTableBooked) {
      contentContainer.classList.add("grid-stack-item--selectable");
    }

    // Обработчик клика по столу
    contentContainer.addEventListener("click", () => {
      const isSelected = contentContainer.classList.contains(
        "grid-stack-item--selected"
      );

      if (props.readonly && !isSelected) {
        // Очищаем предыдущий выбор
        document
          .querySelectorAll(".grid-stack-item--selected")
          .forEach((el) => el.classList.remove("grid-stack-item--selected"));

        // Устанавливаем новый
        contentContainer.classList.add("grid-stack-item--selected");
        selectedTable.value = table.id;
      } else if (!props.readonly) {
        contentContainer.classList.toggle(
          "grid-stack-item--selected",
          !isSelected
        );
        selectedTable.value = isSelected ? null : table.number;
      }

      emit("update:selected-table", selectedTable.value);
    });
  }

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
  }
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
      disableDrag: props.readonly,
      disableResize: props.readonly,
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
