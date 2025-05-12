<template>
  <div class="icon" v-if="value">
    <svg :width="width" :height="height" role="img">
      <use :xlink:href="`${spritePath}#${value}`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import spritePath from "@/assets/sprite.svg";

defineProps({
  value: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "24px",
  },
  height: {
    type: String,
    default: "24px",
  },
});
</script>

<style scoped lang="scss">
@import "./AppIcon";
</style>
