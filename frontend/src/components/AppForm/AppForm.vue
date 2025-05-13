<template>
  <form @submit.prevent="handleSubmit" class="form">
    <p class="form__title">{{ title }}</p>

    <div class="form__fields">
      <AppInput
        v-for="col in cols"
        :key="col.id"
        v-model="model[col.id]"
        :label="col.name"
        :placeholder="col.name"
        :type="col.type || 'text'"
        :readonly="readonly"
        :validation="validation[col.id]"
        :error="getErrorMessage(validation[col.id])"
      />
    </div>

    <div class="form__buttons">
      <slot name="buttons">
        <AppButton v-if="submitText" type="submit">
          {{ submitText }}
        </AppButton>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { AppButton, AppInput } from "@/components";

import { getErrorMessage } from "@/helpers/errorHelpers";
import { showNotification } from "@/hooks/useNotification";

import type { PropType } from "vue";

const props = defineProps({
  title: String,
  cols: {
    type: Array as PropType<Array<{ id: string; name: string; type?: string }>>,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: Object,
    required: true,
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  submitText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["submit"]);

const handleSubmit = async () => {
  const isValid = await props.validation.$validate?.();
  if (!isValid) {
    showNotification("Заполните поля в соответствии с правилами!");
    return;
  }
  emit("submit");
};
</script>

<style scoped lang="scss">
@import "./AppForm.scss";
</style>
