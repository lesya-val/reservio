<template>
  <div class="input">
    <label
      v-if="readonly"
      :class="['input__label', { 'input__label--readonly': readonly }]"
    >
      {{ placeholder }}
    </label>

    <div :class="inputClasses">
      <input
        v-if="type === 'checkbox'"
        type="checkbox"
        :checked="modelValue"
        :disabled="readonly"
        @change="onChange"
      />
      <input
        v-else
        :type="type"
        :min="min"
        :value="modelValue"
        :placeholder="readonly ? 'Не указано' : placeholder"
        class="input__field"
        :disabled="readonly"
        @input="onChange"
      />
    </div>

    <div v-if="error" class="input__error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
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
  min: {
    type: Number,
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

const inputClasses = computed(() => [
  "input__container",
  {
    "input__container--outlined":
      props.type !== "checkbox" && props.view === "outlined",
    "input__container--readonly": props.readonly,
    "input__container--error": props.error,
  },
]);

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit(
    "update:modelValue",
    props.type === "checkbox" ? target.checked : target.value
  );
};
</script>

<style scoped lang="scss">
@import "./AppInput";
</style>
