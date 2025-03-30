<template>
  <div
    ref="notification"
    class="notification"
    :style="`background: ${toastColor.background}`"
  >
    <div class="notification__text" :style="`color: ${toastColor.color}`">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "success",
  },
});

const emit = defineEmits<{ (e: "close"): void }>();

const notification = ref<HTMLElement | null>(null);

const toastColor = computed(() => {
  if (props.type === "error") {
    return { background: "#FCE9E9", color: "#D82222" };
  } else {
    return { background: "#E5FFF0", color: "#17AD53" };
  }
});

const init = () => {
  setTimeout(() => {
    if (notification.value) {
      notification.value.classList.add("notification--visible");
    }
  }, 0);

  let duration = 0;
  if (props.type === "error") {
    duration = 5;
  } else {
    duration = 2;
  }

  setTimeout(() => {
    if (notification.value) {
      notification.value.classList.add("notification--fade-out");
    }

    setTimeout(() => emit("close"), 500);
  }, duration * 1000);
};

onMounted(init);
</script>

<style lang="scss" scoped>
@import "./AppNotification.scss";
</style>
