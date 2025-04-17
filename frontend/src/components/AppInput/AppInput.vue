<template>
  <div class="input">
    <label
      v-if="label"
      :class="['input__label', { 'input__label--readonly': readonly }]"
    >
      {{ label }}
    </label>
    <div
      :class="[
        'input__container',
        {
          'input__container--outlined': type === 'input' && view === 'outlined',
          'input__container--readonly': readonly,
          'input__container--error': error,
        },
      ]"
    >
      <input
        v-if="type === 'checkbox'"
        type="checkbox"
        :checked="modelValue"
        :disabled="readonly"
        @change="updateValue"
      />
      <input
        v-else
        :type="type"
        :value="modelValue"
        :placeholder="readonly ? 'Не указано' : placeholder"
        :class="'input__field'"
        :disabled="readonly"
        @input="updateValue"
      />
    </div>
    <div v-if="error" class="input__error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import type { Validation } from "@vuelidate/core";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Введите значение",
  },
  view: {
    type: String,
    default: "outlined",
  },
  type: {
    type: String,
    default: "input",
  },
  label: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  validation: {
    type: Object as () => Validation | undefined,
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  () => {
    props.validation?.$touch?.();
  }
);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.type === "checkbox") {
    emit("update:modelValue", target.checked);
  } else {
    emit("update:modelValue", target.value);
  }
};
</script>

<style scoped lang="scss">
@import "./AppInput";
</style>
