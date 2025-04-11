<template>
  <div class="input">
    <label
      v-if="label"
      :class="['input__label', { 'input__label--readonly': readonly }]"
      >{{ label }}</label
    >
    <div
      :readonly="readonly"
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
        :checked="Boolean(value)"
        @change="updateValue"
        :disabled="readonly"
      />
      <input
        v-else
        :type="type"
        :value="value"
        :placeholder="readonly ? 'Не указано' : placeholder"
        :class="['input__field']"
        @input="updateValue"
        :readonly="readonly"
      />
    </div>
    <div v-if="error" class="input__error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
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
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["input", "checked"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.type === "checkbox") {
    emit("input", target.checked);
  } else {
    emit("input", target.value);
  }
};
</script>

<style scoped lang="scss">
@import "./AppInput";
</style>
