<template>
  <button
    :class="['button', { disabled: disabled }, `button--${view}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="$slots['icon-before']" class="icon">
      <slot name="icon-before"></slot>
    </span>

    <span class="button-text">
      {{ text }}
    </span>

    <span v-if="$slots['icon-after']" class="icon">
      <slot name="icon-after"></slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  view: {
    type: String,
    default: 'filled',
  },
});

defineEmits(['click']);
</script>

<style scoped lang="scss">
@import './AppButton';
</style>
