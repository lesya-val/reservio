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
          'input__container--readonly': props.readonly,
        },
      ]"
    >
      <select
        :value="modelValue"
        :disabled="readonly"
        @change="onChange"
        class="input__select"
        :class="{ 'input__select--readonly': readonly }"
      >
        <option disabled hidden value="">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <div
        :class="['input__arrow', { 'input__arrow--readonly': readonly }]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Выберите значение",
  },
  label: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as () => { label: string; value: any }[],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Обработка изменения значения
const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
@import "./AppSelect";
</style>
