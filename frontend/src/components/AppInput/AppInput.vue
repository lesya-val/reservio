<template>
  <div class="input">
    <label v-if="label" class="input__label">{{ label }}</label>
    <div
      :class="[
        'input__container',
        {
          'input__container--outlined': type === 'input' && view === 'outlined',
          'input__field--error': error,
        },
      ]"
    >
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="['input__field', { 'input__field--disabled': disabled }]"
        @input="updateValue"
      />
    </div>
    <div v-if="error" class="input__error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
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
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["input"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
};
</script>

<style scoped lang="scss">
@import "./AppInput";
</style>
