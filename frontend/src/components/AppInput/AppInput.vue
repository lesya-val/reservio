<template>
  <div class="input">
    <label v-if="label" class="input__label"> {{ label }}</label>
    <div
      :class="[
        'input__container',
        { 'input__container--outlined': type === 'outlined' },
      ]"
    >
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="['input__field', { 'input__field--disabled': disabled }]"
        @input="updateValue"
      />
    </div>

    <span v-if="errorMessage" class="input__field--error">
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
  label: {
    type: String,
    default: "",
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
