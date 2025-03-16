<template>
  <div :class="['input', { 'input--outlined': type === 'outlined' }]">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'input__field',
        { 'input__field--error': errorMessage },
        { 'input__field--disabled': disabled },
      ]"
      @input="updateValue"
    />

    <span v-if="errorMessage" class="input__field__error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Введите значение",
  },
  type: {
    type: String,
    default: "outlined",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
@import "./AppInput";
</style>
