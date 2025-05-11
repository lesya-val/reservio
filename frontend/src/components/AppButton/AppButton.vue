<template>
  <button
    :class="['button', `button--${view}`, { 'button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="$slots['icon-before']" class="icon">
      <slot name="icon-before" />
    </span>

    <span class="button-text">
      <slot />
    </span>

    <span v-if="$slots['icon-after']" class="icon">
      <slot name="icon-after" />
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: { type: Boolean, default: false },
  view: { type: String, default: "filled" },
});

defineEmits(["click"]);
</script>

<style scoped lang="scss">
@import "./AppButton";
</style>
