<template>
  <v-default>
    <div class="wrapper">
      <div class="hall">
        <ListControls
          :has-search="false"
          :is-new-doc="createMode"
          :has-back="!createMode"
          :is-edit-mode="isEditMode"
          @edit="isEditMode = true"
          @save="handleSave"
        />
        <div class="hall__form">
          <div class="hall__fields">
            <h2 v-if="!formVisible">{{ hallData.name }}</h2>
            <AppForm
              v-if="formVisible"
              :title="!formVisible ? 'Добавление зала' : 'Редактирование стола'"
              :model="hallData"
              :cols="hallFields"
              :validation="v$"
              :readonly="!formVisible"
            />
            <TablesGrid
              :showButton="formVisible"
              :tables="hallData.tables"
              :readonly="!formVisible"
              :clickable="false"
              @update:tables="(val) => (hallData.tables = val)"
            />
          </div>
        </div>
      </div>
    </div>
  </v-default>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

import { AppForm, ListControls, TablesGrid, VDefault } from "@/components";

import useVuelidate from "@vuelidate/core";
import { requiredField } from "@/helpers/validationHelpers";
import { isCreateMode } from "@/helpers/routeHelpers";
import { showNotification } from "@/hooks/useNotification";
import { createHall, getHallById, updateHall } from "@/services/hallsApi";

import type { Table } from "@/types";

const route = useRoute();
const router = useRouter();

const createMode = isCreateMode();
const isEditMode = ref(false);
const hallData = ref({ name: "", tables: [] as Table[] });

const hallFields = [{ id: "name", name: "Название зала" }];

const v$ = useVuelidate({ name: { required: requiredField() } }, hallData);

const formVisible = computed(() => createMode.value || isEditMode.value);

const handleSave = async () => {
  if (!(await v$.value.$validate())) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }

  if (!hallData.value.tables.length) {
    showNotification("Заполните схему зала!");
    return;
  }

  const payload = {
    ...hallData.value,
    capacity: +hallData.value.tables.length,
  };

  const response = createMode.value
    ? await createHall(payload)
    : await updateHall(+route.params.id, payload);

  if (response) {
    showNotification(
      createMode.value ? "Зал успешно создан!" : "Зал успешно обновлён!",
      "success"
    );
    router.push({ name: "HallList" });
  } else {
    showNotification("Ошибка при сохранении зала!");
  }
};

onMounted(async () => {
  if (!createMode.value) {
    const hall = await getHallById(+route.params.id);
    if (hall) {
      hallData.value = { name: hall.name, tables: hall.tables || [] };
    }
  }
});
</script>

<style scoped lang="scss">
@import "./HallPage.scss";
</style>
